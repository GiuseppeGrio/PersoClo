import { useState, useEffect, useCallback, useRef } from 'react';
import { Character, Enemy, CombatState, GameState, Skill, Persona, Item } from './game/types';
import { SKILLS, PERSONAS, LOCATIONS, SCENES, COMBAT_ENCOUNTERS, RANDOM_ENCOUNTERS, ITEMS, createClomp, createLisa, createMark, createBrown, ENEMIES } from './game/data';

// ==================== UTILITY FUNCTIONS ====================
function clamp(val: number, min: number, max: number) { return Math.max(min, Math.min(max, val)); }
function randInt(min: number, max: number) { return Math.floor(Math.random() * (max - min + 1)) + min; }

function createEnemy(id: string): Enemy {
  const template = ENEMIES[id];
  return { ...template, hp: template.maxHp };
}

function getInitialState(): GameState {
  return {
    phase: 'title',
    currentScene: 'intro',
    currentLocation: 'bedroom',
    party: [createClomp()],
    inventory: [
      { ...ITEMS.healingPotion, quantity: 5 },
      { ...ITEMS.spiritPotion, quantity: 3 },
    ],
    gold: 100,
    flags: {},
    dialogueIndex: 0,
    currentDialogue: [],
    chapter: 1,
    day: 1,
    timeOfDay: 'morning',
    scenes: SCENES,
    personaCollection: [PERSONAS.orpheus],
  };
}

// ==================== MAIN APP ====================
export default function App() {
  const [game, setGame] = useState<GameState>(getInitialState());
  const [textReveal, setTextReveal] = useState(0);
  const [showMenu, setShowMenu] = useState(false);
  const [notification, setNotification] = useState('');
  const [combatAnimation, setCombatAnimation] = useState('');
  const [shakeScreen, setShakeScreen] = useState(false);
  const logRef = useRef<HTMLDivElement>(null);

  // Text reveal effect
  useEffect(() => {
    if (game.phase === 'dialogue' && game.currentDialogue.length > 0) {
      const currentLine = game.currentDialogue[game.dialogueIndex];
      if (currentLine) {
        setTextReveal(0);
        const interval = setInterval(() => {
          setTextReveal(prev => {
            if (prev >= currentLine.text.length) {
              clearInterval(interval);
              return currentLine.text.length;
            }
            return prev + 2;
          });
        }, 20);
        return () => clearInterval(interval);
      }
    }
  }, [game.dialogueIndex, game.phase, game.currentDialogue]);

  // Notification timeout
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  // Auto scroll combat log
  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  }, [game.combatState?.log]);

  // ==================== GAME ACTIONS ====================
  const startGame = useCallback(() => {
    const scene = SCENES['intro'];
    setGame(prev => ({
      ...prev,
      phase: 'dialogue',
      currentScene: 'intro',
      currentLocation: scene.location,
      currentDialogue: scene.dialogue,
      dialogueIndex: 0,
    }));
  }, []);

  const advanceDialogue = useCallback(() => {
    const currentLine = game.currentDialogue[game.dialogueIndex];
    // If text is still revealing, show full text
    if (currentLine && textReveal < currentLine.text.length) {
      setTextReveal(currentLine.text.length);
      return;
    }

    if (game.dialogueIndex < game.currentDialogue.length - 1) {
      setGame(prev => ({ ...prev, dialogueIndex: prev.dialogueIndex + 1 }));
    } else {
      // Dialogue finished, move to next scene
      const scene = SCENES[game.currentScene];
      if (scene?.combat) {
        startCombat(scene.combat);
      } else if (scene?.nextScene) {
        if (scene.nextScene === 'exploration') {
          setGame(prev => ({ ...prev, phase: 'exploration', currentLocation: prev.currentLocation }));
        } else if (scene.nextScene === 'title_return') {
          setGame(getInitialState());
        } else {
          const nextScene = SCENES[scene.nextScene];
          if (nextScene) {
            // Check if new characters join
            let newParty = [...game.party];
            if (scene.nextScene === 'after_park_battle' && !newParty.find(c => c.id === 'brown')) {
              newParty.push(createBrown());
              setNotification('Brown joined the party!');
            }
            if (scene.nextScene === 'after_first_battle' && !newParty.find(c => c.id === 'lisa')) {
              newParty.push(createLisa());
              newParty.push(createMark());
              setNotification('Lisa and Mark joined the party!');
            }
            setGame(prev => ({
              ...prev,
              phase: 'dialogue',
              currentScene: scene.nextScene!,
              currentLocation: nextScene.location,
              currentDialogue: nextScene.dialogue,
              dialogueIndex: 0,
              party: newParty,
            }));
          }
        }
      }
    }
  }, [game, textReveal]);

  const startCombat = useCallback((encounterId: string) => {
    const encounter = COMBAT_ENCOUNTERS[encounterId];
    if (!encounter) return;

    const enemies = encounter.enemies.map(id => createEnemy(id));
    const combatState: CombatState = {
      enemies,
      turnOrder: [],
      currentTurn: 0,
      playerTurn: true,
      log: ['Battle start!'],
      phase: 'select',
    };

    setGame(prev => ({
      ...prev,
      phase: 'combat',
      combatState,
    }));
  }, []);

  const startRandomEncounter = useCallback(() => {
    const encounters = RANDOM_ENCOUNTERS[game.currentLocation];
    if (!encounters || encounters.length === 0) return;
    const encounter = encounters[randInt(0, encounters.length - 1)];
    startCombat(encounter);
  }, [game.currentLocation, startCombat]);

  const performAttack = useCallback((skill: Skill, targetIdx: number) => {
    if (!game.combatState) return;

    const cs = { ...game.combatState };
    const log = [...cs.log];
    let enemies = cs.enemies.map(e => ({ ...e }));
    let party = game.party.map(c => ({ ...c }));

    // Determine attacker (first alive party member)
    const attacker = party.find(c => c.hp > 0);
    if (!attacker) return;

    // Check SP
    if (attacker.sp < skill.spCost) {
      log.push(`${attacker.name} doesn't have enough SP!`);
      setGame(prev => ({ ...prev, combatState: { ...cs, log } }));
      return;
    }

    attacker.sp -= skill.spCost;

    if (skill.type === 'heal') {
      // Heal a party member
      const target = party[targetIdx] || party[0];
      const healAmount = skill.power + Math.floor(attacker.magic * 0.5);
      target.hp = Math.min(target.maxHp, target.hp + healAmount);
      log.push(`${attacker.name} uses ${skill.name}! ${target.name} recovers ${healAmount} HP!`);
      setCombatAnimation('heal');
    } else if (skill.type === 'support') {
      log.push(`${attacker.name} uses ${skill.name}! Defense increased!`);
      attacker.defense += 5;
      setCombatAnimation('guard');
    } else {
      // Attack enemies
      const targets = skill.target === 'all' ? enemies.filter(e => e.hp > 0) : [enemies[targetIdx]].filter(e => e.hp > 0);

      targets.forEach(enemy => {
        if (!enemy) return;
        const hitRoll = randInt(1, 100);
        if (hitRoll <= skill.accuracy) {
          let damage = skill.power + Math.floor(attacker.magic * 0.3) - Math.floor(enemy.defense * 0.3);
          // Weakness bonus
          if (enemy.weaknesses.includes(skill.type)) {
            damage = Math.floor(damage * 1.5);
            log.push(`WEAK! ${attacker.name} uses ${skill.name} on ${enemy.name}! ${damage} damage!`);
          } else {
            log.push(`${attacker.name} uses ${skill.name} on ${enemy.name}! ${damage} damage!`);
          }
          damage = Math.max(1, damage);
          enemy.hp -= damage;
          if (enemy.hp <= 0) {
            enemy.hp = 0;
            log.push(`${enemy.name} is defeated!`);
          }
        } else {
          log.push(`${attacker.name} uses ${skill.name} on ${enemy.name}... Miss!`);
        }
      });
      setCombatAnimation('attack');
      setShakeScreen(true);
      setTimeout(() => setShakeScreen(false), 300);
    }

    // Check victory
    if (enemies.every(e => e.hp <= 0)) {
      log.push('=== VICTORY! ===');
      let totalExp = enemies.reduce((sum, e) => sum + e.exp, 0);
      log.push(`Gained ${totalExp} EXP!`);
      party.forEach(c => {
        if (c.hp > 0) {
          c.exp += totalExp;
          while (c.exp >= c.expToNext) {
            c.exp -= c.expToNext;
            c.level++;
            c.maxHp += 15;
            c.hp = c.maxHp;
            c.maxSp += 8;
            c.sp = c.maxSp;
            c.attack += 3;
            c.defense += 2;
            c.magic += 3;
            c.speed += 2;
            c.expToNext = Math.floor(c.expToNext * 1.5);
            log.push(`${c.name} reached Level ${c.level}!`);
          }
        }
      });
      cs.phase = 'victory';
      setGame(prev => ({
        ...prev,
        party,
        combatState: { ...cs, enemies, log },
      }));
      return;
    }

    cs.enemies = enemies;
    cs.log = log;
    cs.phase = 'animating';

    setGame(prev => ({ ...prev, party, combatState: cs }));

    // Enemy turn after delay
    setTimeout(() => {
      enemyTurn(cs, party, enemies);
    }, 1200);
  }, [game]);

  const enemyTurn = useCallback((cs: CombatState, party: Character[], enemies: Enemy[]) => {
    const log = [...cs.log];
    let updatedParty = party.map(c => ({ ...c }));
    const aliveEnemies = enemies.filter(e => e.hp > 0);

    aliveEnemies.forEach(enemy => {
      const aliveParty = updatedParty.filter(c => c.hp > 0);
      if (aliveParty.length === 0) return;

      const target = aliveParty[randInt(0, aliveParty.length - 1)];
      const skill = enemy.skills[randInt(0, enemy.skills.length - 1)];

      if (skill.type === 'heal') {
        const healAmt = skill.power + Math.floor(enemy.magic * 0.3);
        enemy.hp = Math.min(enemy.maxHp, enemy.hp + healAmt);
        log.push(`${enemy.name} uses ${skill.name}! Recovers ${healAmt} HP!`);
      } else if (skill.type === 'support') {
        enemy.defense += 3;
        log.push(`${enemy.name} uses ${skill.name}! Defense up!`);
      } else {
        const hitRoll = randInt(1, 100);
        if (hitRoll <= skill.accuracy) {
          let damage = skill.power + Math.floor(enemy.attack * 0.3) - Math.floor(target.defense * 0.3);
          damage = Math.max(1, damage);
          target.hp -= damage;
          if (target.hp <= 0) {
            target.hp = 0;
            log.push(`${enemy.name} uses ${skill.name} on ${target.name}! ${damage} damage! ${target.name} falls!`);
          } else {
            log.push(`${enemy.name} uses ${skill.name} on ${target.name}! ${damage} damage!`);
          }
        } else {
          log.push(`${enemy.name} attacks ${target.name}... Miss!`);
        }
      }
    });

    // Check defeat
    if (updatedParty.every(c => c.hp <= 0)) {
      log.push('=== DEFEAT... ===');
      cs.phase = 'defeat';
    } else {
      cs.phase = 'select';
    }

    setGame(prev => ({
      ...prev,
      party: updatedParty,
      combatState: { ...cs, log, enemies: cs.enemies.map(e => {
        const updated = enemies.find(ue => ue.id === e.id);
        return updated || e;
      }) },
    }));
  }, []);

  const useItem = useCallback((item: Item, targetIdx: number) => {
    if (!game.combatState) return;
    const cs = { ...game.combatState };
    const log = [...cs.log];
    const party = game.party.map(c => ({ ...c }));
    const target = party[targetIdx] || party[0];

    switch (item.effect) {
      case 'heal50':
        target.hp = Math.min(target.maxHp, target.hp + 50);
        log.push(`Used ${item.name}! ${target.name} recovers 50 HP!`);
        break;
      case 'heal100':
        target.hp = Math.min(target.maxHp, target.hp + 100);
        log.push(`Used ${item.name}! ${target.name} recovers 100 HP!`);
        break;
      case 'sp30':
        target.sp = Math.min(target.maxSp, target.sp + 30);
        log.push(`Used ${item.name}! ${target.name} recovers 30 SP!`);
        break;
      case 'sp50':
        target.sp = Math.min(target.maxSp, target.sp + 50);
        log.push(`Used ${item.name}! ${target.name} recovers 50 SP!`);
        break;
      case 'revive':
        if (target.hp <= 0) {
          target.hp = 50;
          log.push(`Used ${item.name}! ${target.name} is revived with 50 HP!`);
        } else {
          log.push(`${target.name} doesn't need reviving!`);
        }
        break;
    }

    // Decrease quantity
    const inv = [...game.inventory];
    const itemIdx = inv.findIndex(i => i.id === item.id);
    if (itemIdx >= 0) {
      inv[itemIdx] = { ...inv[itemIdx], quantity: inv[itemIdx].quantity - 1 };
      if (inv[itemIdx].quantity <= 0) inv.splice(itemIdx, 1);
    }

    cs.log = log;
    cs.phase = 'animating';
    setGame(prev => ({ ...prev, party, inventory: inv, combatState: cs }));

    setTimeout(() => {
      enemyTurn(cs, party, cs.enemies);
    }, 1200);
  }, [game, enemyTurn]);

  const endCombat = useCallback(() => {
    if (!game.combatState) return;
    const scene = SCENES[game.currentScene];

    if (game.combatState.phase === 'victory') {
      // Add random items
      const newInv = [...game.inventory];
      if (Math.random() > 0.5) {
        const potIdx = newInv.findIndex(i => i.id === 'healingPotion');
        if (potIdx >= 0) newInv[potIdx].quantity++;
        else newInv.push({ ...ITEMS.healingPotion, quantity: 1 });
      }
      if (Math.random() > 0.7) {
        const spIdx = newInv.findIndex(i => i.id === 'spiritPotion');
        if (spIdx >= 0) newInv[spIdx].quantity++;
        else newInv.push({ ...ITEMS.spiritPotion, quantity: 1 });
      }

      if (scene?.nextScene) {
        if (scene.nextScene === 'exploration') {
          setGame(prev => ({ ...prev, phase: 'exploration', combatState: undefined, inventory: newInv }));
        } else {
          const nextScene = SCENES[scene.nextScene];
          if (nextScene) {
            setGame(prev => ({
              ...prev,
              phase: 'dialogue',
              currentScene: scene.nextScene!,
              currentLocation: nextScene.location,
              currentDialogue: nextScene.dialogue,
              dialogueIndex: 0,
              combatState: undefined,
              inventory: newInv,
            }));
          }
        }
      }
    } else if (game.combatState.phase === 'defeat') {
      setGame(prev => ({ ...prev, phase: 'gameover', combatState: undefined }));
    }
  }, [game]);

  const moveToLocation = useCallback((locId: string) => {
    const loc = LOCATIONS[locId];
    if (!loc) return;
    
    // Advance time
    const timeOrder = ['morning', 'afternoon', 'evening', 'night'];
    const currentTimeIdx = timeOrder.indexOf(game.timeOfDay);
    const nextTime = timeOrder[(currentTimeIdx + 1) % timeOrder.length];
    let newDay = game.day;
    if (nextTime === 'morning') newDay++;
    
    setGame(prev => ({
      ...prev,
      currentLocation: locId,
      timeOfDay: nextTime,
      day: newDay,
      flags: { ...prev.flags, [`visited_${locId}`]: true },
    }));

    // Random encounter chance
    if (RANDOM_ENCOUNTERS[locId] && Math.random() < 0.35) {
      setTimeout(() => startRandomEncounter(), 500);
    }
  }, [startRandomEncounter, game.timeOfDay, game.day]);

  const triggerEvent = useCallback((eventId: string) => {
    const scene = SCENES[eventId];
    if (!scene) return;

    // Check if already triggered
    if (game.flags[`event_${eventId}`]) return;

    // Apply event rewards
    let newParty = [...game.party.map(c => ({...c}))];
    let newInv = [...game.inventory];
    let newPersonas = [...game.personaCollection];
    
    if (eventId === 'demon_world_mother') {
      // Clomp learns Azure Burst
      const clomp = newParty.find(c => c.id === 'clomp');
      if (clomp && !clomp.skills.find(s => s.id === 'azureBurst')) {
        clomp.skills.push(SKILLS.azureBurst);
      }
    }
    if (eventId === 'cherry_blossom') {
      // Full heal
      newParty = newParty.map(c => ({...c, hp: c.maxHp, sp: c.maxSp}));
    }
    if (eventId === 'park_reflection') {
      // Magic boost
      const clomp = newParty.find(c => c.id === 'clomp');
      if (clomp) clomp.magic += 5;
    }
    if (eventId === 'mysterious_merchant') {
      // Give items
      const potIdx = newInv.findIndex(i => i.id === 'healingPotion');
      if (potIdx >= 0) newInv[potIdx].quantity += 3;
      else newInv.push({...ITEMS.healingPotion, quantity: 3});
      const spIdx = newInv.findIndex(i => i.id === 'spiritPotion');
      if (spIdx >= 0) newInv[spIdx].quantity += 2;
      else newInv.push({...ITEMS.spiritPotion, quantity: 2});
      newInv.push({...ITEMS.lifeStone, quantity: 1});
      newInv.push({...ITEMS.amulet});
    }

    setGame(prev => ({
      ...prev,
      phase: 'dialogue',
      currentScene: eventId,
      currentLocation: scene.location,
      currentDialogue: scene.dialogue,
      dialogueIndex: 0,
      flags: { ...prev.flags, [`event_${eventId}`]: true },
      party: newParty,
      inventory: newInv,
      personaCollection: newPersonas,
    }));
  }, [game.flags, game.party, game.inventory, game.personaCollection]);

  const restParty = useCallback(() => {
    const party = game.party.map(c => ({
      ...c,
      hp: c.maxHp,
      sp: c.maxSp,
    }));
    setGame(prev => ({ ...prev, party }));
    setNotification('Party fully rested!');
  }, [game.party]);

  // ==================== RENDER ====================

  // TITLE SCREEN
  if (game.phase === 'title') {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/30 via-black to-purple-900/20" />
        <div className="absolute inset-0 flex items-center justify-center opacity-10">
          <div className="text-[200px] animate-pulse">👦</div>
        </div>
        <div className="relative z-10 text-center">
          <h1 className="text-6xl font-bold text-blue-400 mb-2 tracking-wider" style={{ textShadow: '0 0 20px rgba(59,130,246,0.5)' }}>
            CLOMP
          </h1>
          <h2 className="text-3xl text-blue-300 mb-1 tracking-widest">REVELATIONS</h2>
          <p className="text-gray-400 text-sm mb-12 italic">A Persona-inspired RPG</p>
          <div className="space-y-4">
            <button
              onClick={startGame}
              className="block mx-auto px-12 py-3 bg-blue-600/80 hover:bg-blue-500 text-white text-lg rounded border border-blue-400/50 transition-all hover:scale-105 hover:shadow-lg hover:shadow-blue-500/30"
            >
              NEW GAME
            </button>
          </div>
          <div className="mt-16 text-gray-500 text-xs">
            <p>Featuring Clomp — the boy with hair blue as the ocean</p>
            <p className="mt-1">Inspired by Revelations: Persona (1996)</p>
          </div>
        </div>
        {/* Floating particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-blue-400/40 rounded-full animate-float"
              style={{
                left: `${randInt(0, 100)}%`,
                top: `${randInt(0, 100)}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${3 + randInt(0, 4)}s`,
              }}
            />
          ))}
        </div>
      </div>
    );
  }

  // GAME OVER
  if (game.phase === 'gameover') {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center">
        <div className="text-center">
          <h1 className="text-5xl text-red-500 font-bold mb-4">GAME OVER</h1>
          <p className="text-gray-400 mb-8">The darkness has consumed all...</p>
          <button
            onClick={() => setGame(getInitialState())}
            className="px-8 py-3 bg-red-600/80 hover:bg-red-500 text-white rounded border border-red-400/50 transition-all"
          >
            Return to Title
          </button>
        </div>
      </div>
    );
  }

  // DIALOGUE SCREEN
  if (game.phase === 'dialogue') {
    const currentLine = game.currentDialogue[game.dialogueIndex];
    const location = LOCATIONS[game.currentLocation];
    return (
      <div className={`min-h-screen flex flex-col ${getBgClass(game.currentLocation)} ${shakeScreen ? 'animate-shake' : ''}`}>
        {/* Location header */}
        <div className="bg-black/60 p-3 border-b border-blue-500/30">
          <div className="flex justify-between items-center max-w-4xl mx-auto">
            <span className="text-blue-300 text-sm">📍 {location?.name || 'Unknown'}</span>
            <span className="text-gray-400 text-sm">Chapter {game.chapter} — Day {game.day}</span>
          </div>
        </div>

        {/* Scene visual */}
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="text-center">
            <div className="text-8xl mb-4 animate-pulse-slow">
              {getSceneEmoji(game.currentScene)}
            </div>
            {game.party.map(c => (
              <span key={c.id} className="text-4xl mx-2">{c.sprite}</span>
            ))}
          </div>
        </div>

        {/* Dialogue box */}
        <div className="bg-black/90 border-t-2 border-blue-500/50 p-6 min-h-[200px]">
          <div className="max-w-4xl mx-auto">
            {currentLine && (
              <>
                <div className="text-blue-300 font-bold mb-2 text-lg">
                  {currentLine.speaker}
                </div>
                <div className="text-white text-lg leading-relaxed min-h-[60px]">
                  {currentLine.text.substring(0, textReveal)}
                  {textReveal < currentLine.text.length && <span className="animate-pulse">▊</span>}
                </div>
              </>
            )}
            <div className="mt-4 text-right">
              <button
                onClick={advanceDialogue}
                className="px-6 py-2 bg-blue-600/50 hover:bg-blue-500/70 text-white rounded border border-blue-400/30 transition-all text-sm"
              >
                {currentLine && textReveal < currentLine.text.length ? 'Skip ▸' : 'Next ▸'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // EXPLORATION SCREEN
  if (game.phase === 'exploration') {
    const location = LOCATIONS[game.currentLocation];
    const availableLocations = location?.connections || [];
    const events = location?.events || [];
    const untriggeredEvents = events.filter(e => !game.flags[`event_${e}`]);

    return (
      <div className={`min-h-screen flex flex-col ${getBgClass(game.currentLocation)} relative`}>
        {/* Time of day overlay */}
        <div className={`absolute inset-0 bg-gradient-to-b ${getTimeOverlay(game.timeOfDay)} pointer-events-none`} />
        {/* Header */}
        <div className="bg-black/70 p-3 border-b border-blue-500/30">
          <div className="flex justify-between items-center max-w-4xl mx-auto">
            <div className="flex items-center gap-4">
              <span className="text-blue-300 font-bold">📍 {location?.name}</span>
              <span className="text-gray-400 text-sm">
                {getTimeEmoji(game.timeOfDay)} Day {game.day} — {game.timeOfDay}
              </span>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setShowMenu(true)} className="text-gray-300 hover:text-white text-sm px-3 py-1 bg-gray-800/50 rounded border border-gray-600/30">
                ☰ Menu
              </button>
              <button onClick={restParty} className="text-gray-300 hover:text-white text-sm px-3 py-1 bg-gray-800/50 rounded border border-gray-600/30">
                💤 Rest
              </button>
            </div>
          </div>
        </div>

        {/* Location description */}
        <div className="flex-1 p-6 max-w-4xl mx-auto w-full">
          <div className="bg-black/50 rounded-lg p-6 border border-blue-500/20 mb-6">
            <p className="text-gray-200 leading-relaxed italic">{location?.description}</p>
          </div>

          {/* Party status */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
            {game.party.map(c => (
              <div key={c.id} className="bg-black/50 rounded p-3 border border-blue-500/20">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-2xl">{c.sprite}</span>
                  <span className="text-blue-300 font-bold">{c.name}</span>
                  <span className="text-gray-500 text-xs">Lv.{c.level}</span>
                </div>
                <div className="flex gap-4 text-xs">
                  <span className="text-green-400">HP: {c.hp}/{c.maxHp}</span>
                  <span className="text-blue-400">SP: {c.sp}/{c.maxSp}</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-1.5 mt-1">
                  <div className="bg-green-500 h-1.5 rounded-full" style={{ width: `${(c.hp / c.maxHp) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>

          {/* Events */}
          {untriggeredEvents.length > 0 && (
            <div className="mb-6">
              <h3 className="text-yellow-300 font-bold mb-2">⚡ Points of Interest</h3>
              <div className="space-y-2">
                {untriggeredEvents.map(e => (
                  <button
                    key={e}
                    onClick={() => triggerEvent(e)}
                    className="block w-full text-left px-4 py-3 bg-yellow-900/30 hover:bg-yellow-800/40 border border-yellow-500/30 rounded text-yellow-200 transition-all"
                  >
                    ✦ Investigate ({getEventName(e)})
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Travel */}
          <div>
            <h3 className="text-blue-300 font-bold mb-2">🚶 Travel To</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {availableLocations.map(locId => {
                const loc = LOCATIONS[locId];
                return (
                  <button
                    key={locId}
                    onClick={() => moveToLocation(locId)}
                    className="text-left px-4 py-3 bg-blue-900/30 hover:bg-blue-800/40 border border-blue-500/30 rounded text-blue-200 transition-all"
                  >
                    → {loc?.name}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Menu overlay */}
        {showMenu && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-900 rounded-lg border border-blue-500/30 max-w-lg w-full max-h-[90vh] overflow-y-auto p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl text-blue-300 font-bold">Menu</h2>
                <button onClick={() => setShowMenu(false)} className="text-gray-400 hover:text-white text-xl">✕</button>
              </div>

              {/* Party */}
              <h3 className="text-yellow-300 font-bold mb-2">Party</h3>
              {game.party.map(c => (
                <div key={c.id} className="bg-black/50 rounded p-3 mb-2 border border-gray-700">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{c.sprite}</span>
                    <div>
                      <div className="text-white font-bold">{c.name} <span className="text-gray-400 text-xs">Lv.{c.level}</span></div>
                      <div className="text-xs text-gray-400">{c.description}</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mt-2 text-xs">
                    <span className="text-green-400">HP: {c.hp}/{c.maxHp}</span>
                    <span className="text-blue-400">SP: {c.sp}/{c.maxSp}</span>
                    <span className="text-red-300">ATK: {c.attack}</span>
                    <span className="text-yellow-300">DEF: {c.defense}</span>
                    <span className="text-purple-300">MAG: {c.magic}</span>
                    <span className="text-cyan-300">SPD: {c.speed}</span>
                  </div>
                  {c.persona && (
                    <div className="mt-2 text-xs text-blue-300">
                      Persona: {c.persona.sprite} {c.persona.name} ({c.persona.arcana})
                    </div>
                  )}
                  <div className="mt-1 text-xs text-gray-500">
                    EXP: {c.exp}/{c.expToNext}
                  </div>
                </div>
              ))}

              {/* Inventory */}
              <h3 className="text-yellow-300 font-bold mb-2 mt-4">Inventory</h3>
              {game.inventory.length === 0 ? (
                <p className="text-gray-500 text-sm">Empty</p>
              ) : (
                <div className="space-y-1">
                  {game.inventory.map(item => (
                    <div key={item.id} className="bg-black/50 rounded p-2 border border-gray-700 text-sm">
                      <span className="text-white">{item.name}</span>
                      <span className="text-gray-400 ml-2">x{item.quantity}</span>
                      <p className="text-gray-500 text-xs">{item.description}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Gold */}
              <div className="mt-4 text-yellow-300">💰 Gold: {game.gold}</div>

              {/* Persona Collection */}
              <h3 className="text-yellow-300 font-bold mb-2 mt-4">Persona Collection</h3>
              <div className="space-y-1">
                {game.personaCollection.map(p => (
                  <div key={p.id} className="bg-black/50 rounded p-2 border border-gray-700 text-sm">
                    <span className="text-2xl mr-2">{p.sprite}</span>
                    <span className="text-blue-300">{p.name}</span>
                    <span className="text-gray-500 ml-2">({p.arcana})</span>
                    <p className="text-gray-500 text-xs mt-1">{p.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Notification */}
        {notification && (
          <div className="fixed top-4 left-1/2 -translate-x-1/2 bg-blue-600/90 text-white px-6 py-3 rounded-lg border border-blue-400/50 z-50 animate-bounce">
            {notification}
          </div>
        )}
      </div>
    );
  }

  // COMBAT SCREEN
  if (game.phase === 'combat' && game.combatState) {
    const cs = game.combatState;
    const aliveParty = game.party.filter(c => c.hp > 0);
    const currentChar = aliveParty[0];

    return (
      <div className={`min-h-screen flex flex-col ${getCombatBgClass(cs)} ${shakeScreen ? 'animate-shake' : ''}`}>
        {/* Combat header */}
        <div className="bg-black/70 p-2 border-b border-red-500/30">
          <div className="text-center text-red-300 font-bold">⚔️ BATTLE ⚔️</div>
        </div>

        {/* Enemies */}
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="flex gap-6 flex-wrap justify-center">
            {cs.enemies.map((enemy, idx) => (
              <div key={idx} className={`text-center transition-all ${enemy.hp <= 0 ? 'opacity-20 scale-75' : 'hover:scale-110'}`}>
                <div className={`text-6xl mb-2 ${combatAnimation === 'attack' && enemy.hp > 0 ? 'animate-bounce' : ''}`}>
                  {enemy.sprite}
                </div>
                <div className="text-red-300 text-sm font-bold">{enemy.name}</div>
                <div className="w-24 bg-gray-800 rounded-full h-2 mt-1 mx-auto">
                  <div className="bg-red-500 h-2 rounded-full transition-all duration-500" style={{ width: `${(enemy.hp / enemy.maxHp) * 100}%` }} />
                </div>
                <div className="text-xs text-gray-400">{enemy.hp}/{enemy.maxHp}</div>
                {enemy.weaknesses.length > 0 && enemy.hp > 0 && (
                  <div className="text-xs text-yellow-400 mt-1">
                    Weak: {enemy.weaknesses.join(', ')}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Party status */}
        <div className="bg-black/70 p-3 border-t border-blue-500/30">
          <div className="flex gap-4 justify-center flex-wrap">
            {game.party.map(c => (
              <div key={c.id} className={`text-center ${c.hp <= 0 ? 'opacity-40' : ''}`}>
                <div className="text-3xl">{c.sprite}</div>
                <div className="text-blue-300 text-xs font-bold">{c.name}</div>
                <div className="text-green-400 text-xs">HP:{c.hp}/{c.maxHp}</div>
                <div className="text-blue-400 text-xs">SP:{c.sp}/{c.maxSp}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Combat actions / log */}
        <div className="bg-black/90 border-t-2 border-blue-500/50 p-4 min-h-[250px]">
          <div className="max-w-4xl mx-auto">
            {cs.phase === 'victory' && (
              <div className="text-center">
                <h3 className="text-2xl text-yellow-300 font-bold mb-4">🎉 VICTORY! 🎉</h3>
                <button onClick={endCombat} className="px-8 py-3 bg-blue-600/80 hover:bg-blue-500 text-white rounded border border-blue-400/50">
                  Continue
                </button>
              </div>
            )}
            {cs.phase === 'defeat' && (
              <div className="text-center">
                <h3 className="text-2xl text-red-500 font-bold mb-4">💀 DEFEAT 💀</h3>
                <button onClick={endCombat} className="px-8 py-3 bg-red-600/80 hover:bg-red-500 text-white rounded border border-red-400/50">
                  Continue
                </button>
              </div>
            )}
            {cs.phase === 'select' && currentChar && (
              <div>
                <div className="text-blue-300 font-bold mb-2">{currentChar.name}'s Turn {currentChar.persona && <span className="text-purple-300 text-sm">— {currentChar.persona.sprite} {currentChar.persona.name}</span>}</div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-3">
                  {currentChar.skills.map(skill => (
                    <button
                      key={skill.id}
                      onClick={() => {
                        if (skill.type === 'heal' || skill.target === 'ally' || skill.target === 'self') {
                          performAttack(skill, 0);
                        } else if (skill.target === 'all') {
                          performAttack(skill, 0);
                        } else {
                          // Target first alive enemy
                          const firstAlive = cs.enemies.findIndex(e => e.hp > 0);
                          performAttack(skill, firstAlive >= 0 ? firstAlive : 0);
                        }
                      }}
                      disabled={currentChar.sp < skill.spCost}
                      className="px-3 py-2 bg-blue-900/50 hover:bg-blue-800/60 disabled:opacity-40 disabled:cursor-not-allowed border border-blue-500/30 rounded text-sm text-blue-200 transition-all text-left"
                    >
                      <div className="font-bold">{skill.name}</div>
                      <div className="text-xs text-gray-400">
                        {skill.spCost > 0 ? `${skill.spCost} SP` : 'Free'} | {skill.type}
                      </div>
                    </button>
                  ))}
                </div>
                {/* Target selection for single-target attacks */}
                <div className="border-t border-gray-700 pt-2 mt-1 mb-2">
                  <div className="text-gray-400 text-xs mb-1">Attack Target:</div>
                  <div className="flex gap-2 flex-wrap">
                    {cs.enemies.filter(e => e.hp > 0).map((enemy, idx) => {
                      const realIdx = cs.enemies.indexOf(enemy);
                      return (
                        <button
                          key={idx}
                          onClick={() => {
                            const atkSkill = currentChar.skills.find(s => s.type !== 'heal' && s.type !== 'support' && s.target === 'single') || currentChar.skills[0];
                            if (atkSkill) performAttack(atkSkill, realIdx);
                          }}
                          className="px-3 py-1 bg-red-900/50 hover:bg-red-800/60 border border-red-500/30 rounded text-xs text-red-200"
                        >
                          {enemy.sprite} {enemy.name} (HP:{enemy.hp})
                        </button>
                      );
                    })}
                  </div>
                </div>
                {/* Items in combat */}
                <div className="border-t border-gray-700 pt-2 mt-2">
                  <div className="text-gray-400 text-xs mb-1">Items:</div>
                  <div className="flex gap-2 flex-wrap">
                    {game.inventory.filter(i => i.type === 'consumable').map(item => (
                      <button
                        key={item.id}
                        onClick={() => useItem(item, 0)}
                        className="px-3 py-1 bg-green-900/50 hover:bg-green-800/60 border border-green-500/30 rounded text-xs text-green-200"
                      >
                        {item.name} (x{item.quantity})
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
            {cs.phase === 'animating' && (
              <div className="text-center text-gray-400 animate-pulse">
                ...
              </div>
            )}

            {/* Combat log */}
            <div ref={logRef} className="mt-3 max-h-32 overflow-y-auto bg-black/50 rounded p-2 border border-gray-700">
              {cs.log.slice(-8).map((line, i) => (
                <div key={i} className="text-xs text-gray-300 py-0.5">{line}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

// ==================== HELPER FUNCTIONS ====================
function getBgClass(location: string): string {
  const bgs: Record<string, string> = {
    bedroom: 'bg-gradient-to-b from-amber-900/30 to-gray-900',
    hallway: 'bg-gradient-to-b from-gray-800 to-gray-900',
    street: 'bg-gradient-to-b from-blue-900/20 to-gray-900',
    school: 'bg-gradient-to-b from-indigo-900/30 to-gray-900',
    schoolBasement: 'bg-gradient-to-b from-purple-900/40 to-black',
    park: 'bg-gradient-to-b from-green-900/20 to-gray-900',
    shrine: 'bg-gradient-to-b from-red-900/20 to-gray-900',
    shoppingDistrict: 'bg-gradient-to-b from-yellow-900/20 to-gray-900',
    shopping: 'bg-gradient-to-b from-yellow-900/20 to-gray-900',
    hospital: 'bg-gradient-to-b from-cyan-900/20 to-gray-900',
    demonWorld: 'bg-gradient-to-b from-red-900/50 to-black',
    finalArea: 'bg-gradient-to-b from-purple-900/50 to-black',
  };
  return bgs[location] || 'bg-gray-900';
}

function getTimeOverlay(time: string): string {
  const overlays: Record<string, string> = {
    morning: 'from-yellow-500/5 to-transparent',
    afternoon: 'from-white/5 to-transparent',
    evening: 'from-orange-900/20 to-blue-900/10',
    night: 'from-blue-950/40 to-black/30',
  };
  return overlays[time] || '';
}

function getCombatBgClass(cs: CombatState): string {
  const bgs: Record<string, string> = {
    basement: 'bg-gradient-to-b from-purple-900/60 to-black',
    park: 'bg-gradient-to-b from-green-900/40 to-gray-900',
    shrine: 'bg-gradient-to-b from-red-900/40 to-gray-900',
    demonworld: 'bg-gradient-to-b from-red-900/60 to-black',
    void: 'bg-gradient-to-b from-purple-900/60 to-black',
    hospital: 'bg-gradient-to-b from-cyan-900/40 to-gray-900',
    street: 'bg-gradient-to-b from-blue-900/40 to-gray-900',
  };
  return bgs[cs.enemies[0]?.id.includes('boss') ? 'void' : 'basement'] || 'bg-gray-900';
}

function getSceneEmoji(sceneId: string): string {
  const emojis: Record<string, string> = {
    intro: '🌅',
    wake_up_event: '🏠',
    street_walk: '🌸',
    school_classroom: '🏫',
    basement_ritual: '🔮',
    after_first_battle: '✨',
    chapter1_hub: '🏙️',
    park_meeting: '⛲',
    after_park_battle: '💎',
    chapter2_hub: '🌲',
    shrine_discovery: '⛩️',
    after_shrine_battle: '💎',
    chapter3_hub: '🌀',
    demon_realm_entry: '👿',
    after_aciel: '💀',
    chapter4_hub: '🕳️',
    final_confrontation: '⚡',
    ending: '🌅',
    credits: '🎬',
    hospital_event: '🏥',
    after_hospital: '💚',
    shop_event: '🏪',
  };
  return emojis[sceneId] || '📍';
}

function getEventName(eventId: string): string {
  const names: Record<string, string> = {
    wake_up: 'Your Room',
    school_event: 'School Hall',
    basement_ritual: 'Basement',
    park_meeting: 'Fountain',
    shrine_discovery: 'Shrine Altar',
    demon_realm_entry: 'Portal',
    final_confrontation: 'The Void',
    hospital_event: 'Patient Ward',
    shop_event: 'Mysterious Shop',
    exploration: 'Explore',
    clomp_dream: 'Dream Sequence',
    lisa_secret: 'Lisa\'s Secret',
    mark_training: 'Mark\'s Training',
    brown_truth: 'Brown\'s Truth',
    mysterious_merchant: 'Mysterious Shop',
    hospital_patients: 'Patient Ward',
    cherry_blossom: 'Cherry Blossom Tree',
    night_patrol: 'Night Patrol',
    school_memories: 'School Memories',
    demon_encounter_peaceful: 'Peaceful Demon',
    final_prep: 'Final Preparation',
    hallway_shadow: 'Hallway Shadow',
    park_reflection: 'Fountain Reflection',
    school_rooftop: 'School Rooftop',
    demon_world_mother: 'Mother\'s Palace',
    street_encounter: 'Street Encounter',
    hospital_doctor: 'Doctor\'s Request',
    chapter1_transition: 'Story',
    chapter2_transition: 'Story',
    chapter3_transition: 'Story',
    chapter4_transition: 'Story',
  };
  return names[eventId] || eventId;
}

function getTimeEmoji(time: string): string {
  const emojis: Record<string, string> = {
    morning: '🌅',
    afternoon: '☀️',
    evening: '🌆',
    night: '🌙',
  };
  return emojis[time] || '🌅';
}
