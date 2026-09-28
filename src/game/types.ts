export interface Character {
  id: string;
  name: string;
  hp: number;
  maxHp: number;
  sp: number;
  maxSp: number;
  attack: number;
  defense: number;
  speed: number;
  magic: number;
  level: number;
  exp: number;
  expToNext: number;
  persona?: Persona;
  skills: Skill[];
  description: string;
  sprite: string;
}

export interface Persona {
  id: string;
  name: string;
  arcana: string;
  hp: number;
  maxHp: number;
  attack: number;
  defense: number;
  magic: number;
  speed: number;
  skills: Skill[];
  description: string;
  sprite: string;
}

export interface Skill {
  id: string;
  name: string;
  type: 'physical' | 'fire' | 'ice' | 'electric' | 'wind' | 'light' | 'dark' | 'heal' | 'support';
  power: number;
  spCost: number;
  target: 'single' | 'all' | 'self' | 'ally';
  description: string;
  accuracy: number;
}

export interface Enemy {
  id: string;
  name: string;
  hp: number;
  maxHp: number;
  attack: number;
  defense: number;
  speed: number;
  magic: number;
  skills: Skill[];
  exp: number;
  description: string;
  sprite: string;
  weaknesses: string[];
}

export interface Location {
  id: string;
  name: string;
  description: string;
  connections: string[];
  encounters?: string[];
  events: string[];
  bg: string;
  explored: boolean;
}

export interface DialogueLine {
  speaker: string;
  text: string;
  effect?: string;
}

export interface Scene {
  id: string;
  location: string;
  dialogue: DialogueLine[];
  choices?: Choice[];
  nextScene?: string;
  combat?: string;
}

export interface Choice {
  text: string;
  nextScene: string;
  condition?: string;
}

export interface GameState {
  phase: 'title' | 'exploration' | 'dialogue' | 'combat' | 'menu' | 'gameover' | 'ending';
  currentScene: string;
  currentLocation: string;
  party: Character[];
  inventory: Item[];
  gold: number;
  flags: Record<string, boolean>;
  dialogueIndex: number;
  currentDialogue: DialogueLine[];
  combatState?: CombatState;
  chapter: number;
  day: number;
  timeOfDay: string;
  scenes: Record<string, Scene>;
  personaCollection: Persona[];
}

export interface Item {
  id: string;
  name: string;
  type: 'consumable' | 'equipment' | 'key';
  effect?: string;
  value: number;
  description: string;
  quantity: number;
}

export interface CombatState {
  enemies: Enemy[];
  turnOrder: string[];
  currentTurn: number;
  playerTurn: boolean;
  log: string[];
  phase: 'select' | 'target' | 'animating' | 'victory' | 'defeat';
  selectedSkill?: Skill;
  selectedCharacter?: number;
}
