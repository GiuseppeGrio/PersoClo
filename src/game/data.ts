import { Character, Enemy, Location, Scene, Skill, Persona, Item } from './types';

// ============ SKILLS ============
export const SKILLS: Record<string, Skill> = {
  slash: { id: 'slash', name: 'Slash', type: 'physical', power: 25, spCost: 0, target: 'single', description: 'A basic sword strike.', accuracy: 95 },
  heavyBlow: { id: 'heavyBlow', name: 'Heavy Blow', type: 'physical', power: 45, spCost: 4, target: 'single', description: 'A powerful downward strike.', accuracy: 85 },
  twinStrike: { id: 'twinStrike', name: 'Twin Strike', type: 'physical', power: 30, spCost: 3, target: 'all', description: 'Two rapid hits on all enemies.', accuracy: 80 },
  blueFlame: { id: 'blueFlame', name: 'Blue Flame', type: 'fire', power: 40, spCost: 6, target: 'single', description: 'Mystical blue fire from Clomp\'s hair.', accuracy: 90 },
  azureBurst: { id: 'azureBurst', name: 'Azure Burst', type: 'fire', power: 60, spCost: 12, target: 'all', description: 'An explosion of azure flames.', accuracy: 85 },
  iceShard: { id: 'iceShard', name: 'Ice Shard', type: 'ice', power: 35, spCost: 5, target: 'single', description: 'Sharp ice projectile.', accuracy: 92 },
  blizzard: { id: 'blizzard', name: 'Blizzard', type: 'ice', power: 55, spCost: 10, target: 'all', description: 'A freezing storm.', accuracy: 80 },
  thunder: { id: 'thunder', name: 'Thunder', type: 'electric', power: 38, spCost: 5, target: 'single', description: 'A bolt of lightning.', accuracy: 90 },
  stormCall: { id: 'stormCall', name: 'Storm Call', type: 'electric', power: 50, spCost: 10, target: 'all', description: 'Calls down a tempest.', accuracy: 82 },
  heal: { id: 'heal', name: 'Heal', type: 'heal', power: 50, spCost: 6, target: 'ally', description: 'Restores HP to an ally.', accuracy: 100 },
  healMore: { id: 'healMore', name: 'Heal More', type: 'heal', power: 100, spCost: 12, target: 'ally', description: 'Greatly restores HP.', accuracy: 100 },
  healAll: { id: 'healAll', name: 'Mediarahan', type: 'heal', power: 80, spCost: 20, target: 'all', description: 'Heals all party members.', accuracy: 100 },
  lightJudgment: { id: 'lightJudgment', name: 'Light Judgment', type: 'light', power: 70, spCost: 15, target: 'single', description: 'Holy light smites the enemy.', accuracy: 85 },
  darkPact: { id: 'darkPact', name: 'Dark Pact', type: 'dark', power: 65, spCost: 14, target: 'single', description: 'Dark energy drains life.', accuracy: 88 },
  windSlash: { id: 'windSlash', name: 'Wind Slash', type: 'wind', power: 32, spCost: 4, target: 'single', description: 'A blade of wind.', accuracy: 93 },
  guard: { id: 'guard', name: 'Guard', type: 'support', power: 0, spCost: 0, target: 'self', description: 'Reduces damage taken.', accuracy: 100 },
  personaAwaken: { id: 'personaAwaken', name: 'Persona Awaken', type: 'light', power: 80, spCost: 20, target: 'single', description: 'Channel your Persona\'s power.', accuracy: 90 },
  summonPersona: { id: 'summonPersona', name: 'Summon Persona', type: 'light', power: 90, spCost: 25, target: 'all', description: 'Full power of your Persona.', accuracy: 85 },
};

// ============ PERSONAS ============
export const PERSONAS: Record<string, Persona> = {
  orpheus: {
    id: 'orpheus',
    name: 'Orpheus',
    arcana: 'Bard',
    hp: 200,
    maxHp: 200,
    attack: 45,
    defense: 35,
    magic: 60,
    speed: 50,
    skills: [SKILLS.blueFlame, SKILLS.heal, SKILLS.lightJudgment],
    description: 'The legendary musician who descended into the underworld. Its music can charm even death itself.',
    sprite: '🎵'
  },
  ifrit: {
    id: 'ifrit',
    name: 'Ifrit',
    arcana: 'Strength',
    hp: 250,
    maxHp: 250,
    attack: 65,
    defense: 40,
    magic: 55,
    speed: 35,
    skills: [SKILLS.azureBurst, SKILLS.heavyBlow, SKILLS.blueFlame],
    description: 'A powerful fire demon from ancient mythology. Its rage burns hotter than the sun.',
    sprite: '🔥'
  },
  jackFrost: {
    id: 'jackFrost',
    name: 'Jack Frost',
    arcana: 'Magician',
    hp: 150,
    maxHp: 150,
    attack: 30,
    defense: 30,
    magic: 50,
    speed: 45,
    skills: [SKILLS.iceShard, SKILLS.blizzard, SKILLS.windSlash],
    description: 'A cheerful ice spirit who brings winter\'s chill. Don\'t let the smile fool you.',
    sprite: '❄️'
  },
  thor: {
    id: 'thor',
    name: 'Thor',
    arcana: 'Chariot',
    hp: 300,
    maxHp: 300,
    attack: 70,
    defense: 50,
    magic: 55,
    speed: 40,
    skills: [SKILLS.thunder, SKILLS.stormCall, SKILLS.heavyBlow],
    description: 'The Norse god of thunder. His hammer Mjolnir splits the heavens.',
    sprite: '⚡'
  },
  sephiroth: {
    id: 'sephiroth',
    name: 'Metatron',
    arcana: 'Justice',
    hp: 400,
    maxHp: 400,
    attack: 80,
    defense: 60,
    magic: 75,
    speed: 55,
    skills: [SKILLS.lightJudgment, SKILLS.summonPersona, SKILLS.healMore],
    description: 'The Voice of God, an angel of supreme power. Its seven wings span the cosmos.',
    sprite: '✨'
  }
};

// ============ CHARACTERS ============
export const createClomp = (): Character => ({
  id: 'clomp',
  name: 'Clomp',
  hp: 120,
  maxHp: 120,
  sp: 60,
  maxSp: 60,
  attack: 28,
  defense: 22,
  speed: 30,
  magic: 35,
  level: 1,
  exp: 0,
  expToNext: 50,
  persona: PERSONAS.orpheus,
  skills: [SKILLS.slash, SKILLS.blueFlame, SKILLS.heal],
  description: 'A mysterious boy with long blue hair reaching to his heels. He carries a burden from another world.',
  sprite: '👦'
});

export const createLisa = (): Character => ({
  id: 'lisa',
  name: 'Lisa',
  hp: 95,
  maxHp: 95,
  sp: 80,
  maxSp: 80,
  attack: 18,
  defense: 20,
  speed: 28,
  magic: 40,
  level: 1,
  exp: 0,
  expToNext: 50,
  persona: PERSONAS.jackFrost,
  skills: [SKILLS.iceShard, SKILLS.heal, SKILLS.windSlash],
  description: 'Clomp\'s childhood friend. Kind and gentle, but with a hidden strength.',
  sprite: '👧'
});

export const createMark = (): Character => ({
  id: 'mark',
  name: 'Mark',
  hp: 140,
  maxHp: 140,
  sp: 40,
  maxSp: 40,
  attack: 35,
  defense: 30,
  speed: 22,
  magic: 15,
  level: 1,
  exp: 0,
  expToNext: 50,
  persona: PERSONAS.ifrit,
  skills: [SKILLS.heavyBlow, SKILLS.slash, SKILLS.guard],
  description: 'The captain of the school\'s kendo club. Loyal and brave, if sometimes reckless.',
  sprite: '🧑'
});

export const createBrown = (): Character => ({
  id: 'brown',
  name: 'Brown',
  hp: 100,
  maxHp: 100,
  sp: 70,
  maxSp: 70,
  attack: 22,
  defense: 18,
  speed: 35,
  magic: 38,
  level: 1,
  exp: 0,
  expToNext: 50,
  persona: PERSONAS.thor,
  skills: [SKILLS.thunder, SKILLS.windSlash, SKILLS.heal],
  description: 'A quiet transfer student who knows more than he lets on. His eyes hold ancient wisdom.',
  sprite: '🧒'
});

// ============ ENEMIES ============
export const ENEMIES: Record<string, Enemy> = {
  shadow: {
    id: 'shadow',
    name: 'Shadow',
    hp: 60,
    maxHp: 60,
    attack: 18,
    defense: 10,
    speed: 20,
    magic: 12,
    skills: [SKILLS.slash],
    exp: 15,
    description: 'A dark mass given form. It whispers fragments of forgotten nightmares.',
    sprite: '👤',
    weaknesses: ['light']
  },
  ghost: {
    id: 'ghost',
    name: 'Poltergeist',
    hp: 80,
    maxHp: 80,
    attack: 15,
    defense: 8,
    speed: 28,
    magic: 25,
    skills: [SKILLS.iceShard, SKILLS.windSlash],
    exp: 20,
    description: 'A restless spirit bound to this plane by unresolved trauma.',
    sprite: '👻',
    weaknesses: ['light', 'fire']
  },
  demon: {
    id: 'demon',
    name: 'Lesser Demon',
    hp: 120,
    maxHp: 120,
    attack: 28,
    defense: 18,
    speed: 15,
    magic: 20,
    skills: [SKILLS.heavyBlow, SKILLS.blueFlame],
    exp: 35,
    description: 'A minor demon that slipped through the veil between worlds.',
    sprite: '😈',
    weaknesses: ['light']
  },
  wraith: {
    id: 'wraith',
    name: 'Wraith',
    hp: 100,
    maxHp: 100,
    attack: 22,
    defense: 12,
    speed: 32,
    magic: 30,
    skills: [SKILLS.darkPact, SKILLS.iceShard],
    exp: 30,
    description: 'A being of pure darkness that feeds on human fear.',
    sprite: '🌑',
    weaknesses: ['light', 'fire']
  },
  knight: {
    id: 'knight',
    name: 'Dark Knight',
    hp: 180,
    maxHp: 180,
    attack: 35,
    defense: 30,
    speed: 18,
    magic: 15,
    skills: [SKILLS.heavyBlow, SKILLS.slash, SKILLS.guard],
    exp: 50,
    description: 'An armored specter of a fallen warrior, still bound by its oath.',
    sprite: '⚔️',
    weaknesses: ['electric']
  },
  harpy: {
    id: 'harpy',
    name: 'Harpy',
    hp: 90,
    maxHp: 90,
    attack: 25,
    defense: 14,
    speed: 38,
    magic: 22,
    skills: [SKILLS.windSlash, SKILLS.slash],
    exp: 28,
    description: 'A winged creature that swoops from the darkness to tear at its prey.',
    sprite: '🦅',
    weaknesses: ['electric', 'ice']
  },
  bossDevil: {
    id: 'bossDevil',
    name: 'Aciel',
    hp: 500,
    maxHp: 500,
    attack: 45,
    defense: 35,
    speed: 30,
    magic: 50,
    skills: [SKILLS.azureBurst, SKILLS.darkPact, SKILLS.stormCall, SKILLS.healMore],
    exp: 200,
    description: 'A powerful demon who seeks to merge the human world with the demon realm. Its laughter echoes through dimensions.',
    sprite: '👿',
    weaknesses: ['light']
  },
  bossKnight: {
    id: 'bossKnight',
    name: 'The Black Rider',
    hp: 400,
    maxHp: 400,
    attack: 50,
    defense: 40,
    speed: 25,
    magic: 30,
    skills: [SKILLS.heavyBlow, SKILLS.darkPact, SKILLS.summonPersona, SKILLS.guard],
    exp: 180,
    description: 'One of the four riders of the apocalypse. Its blade cuts through reality itself.',
    sprite: '🖤',
    weaknesses: ['light', 'fire']
  },
  bossGoddess: {
    id: 'bossGoddess',
    name: 'Erebus',
    hp: 700,
    maxHp: 700,
    attack: 55,
    defense: 45,
    speed: 35,
    magic: 60,
    skills: [SKILLS.summonPersona, SKILLS.azureBurst, SKILLS.stormCall, SKILLS.healAll, SKILLS.darkPact],
    exp: 350,
    description: 'The primordial darkness that existed before creation. It seeks to return all things to the void.',
    sprite: '🕳️',
    weaknesses: ['light']
  }
};

// ============ ITEMS ============
export const ITEMS: Record<string, Item> = {
  healingPotion: { id: 'healingPotion', name: 'Healing Potion', type: 'consumable', effect: 'heal50', value: 50, description: 'Restores 50 HP.', quantity: 3 },
  spiritPotion: { id: 'spiritPotion', name: 'Spirit Potion', type: 'consumable', effect: 'sp30', value: 30, description: 'Restores 30 SP.', quantity: 2 },
  lifeStone: { id: 'lifeStone', name: 'Life Stone', type: 'consumable', effect: 'heal100', value: 100, description: 'Restores 100 HP.', quantity: 1 },
  soulDrop: { id: 'soulDrop', name: 'Soul Drop', type: 'consumable', effect: 'sp50', value: 50, description: 'Restores 50 SP.', quantity: 1 },
  reviveStone: { id: 'reviveStone', name: 'Revive Stone', type: 'consumable', effect: 'revive', value: 50, description: 'Revives a fallen ally with 50 HP.', quantity: 1 },
  oldKey: { id: 'oldKey', name: 'Old Key', type: 'key', value: 0, description: 'A rusted key found in the school basement.', quantity: 1 },
  crystal: { id: 'crystal', name: 'Blue Crystal', type: 'key', value: 0, description: 'A crystal that pulses with blue energy. It resonates with Clomp\'s hair.', quantity: 1 },
  amulet: { id: 'amulet', name: 'Protection Amulet', type: 'equipment', value: 0, description: 'An amulet that boosts defense.', quantity: 1 },
};

// ============ LOCATIONS ============
export const LOCATIONS: Record<string, Location> = {
  bedroom: {
    id: 'bedroom',
    name: "Clomp's Bedroom",
    description: 'Your small room in the apartment. Morning light filters through the curtains. Your long blue hair catches the light like water. The room feels safe, a sanctuary from the supernatural dangers outside.',
    connections: ['hallway'],
    events: ['wake_up', 'clomp_dream'],
    bg: 'bedroom',
    explored: false
  },
  hallway: {
    id: 'hallway',
    name: 'Apartment Hallway',
    description: 'The dim hallway of your apartment building. The walls seem to pulse faintly with an otherworldly energy. Shadows cling to the corners, watching.',
    connections: ['bedroom', 'street'],
    events: ['hallway_shadow'],
    bg: 'hallway',
    explored: false
  },
  street: {
    id: 'street',
    name: 'Mikage-cho Street',
    description: 'The quiet streets of Mikage-cho. Cherry blossoms drift through the air, but something feels... wrong. The shadows seem too dark, and an unnatural chill hangs in the air.',
    connections: ['hallway', 'school', 'park', 'shoppingDistrict'],
    events: ['night_patrol', 'street_encounter'],
    bg: 'street',
    explored: false
  },
  school: {
    id: 'school',
    name: 'Garden Academy',
    description: 'Your school. The building looks normal during the day, but you can feel the barrier between worlds thinning here. Memories of happier times linger in the halls.',
    connections: ['street', 'schoolBasement'],
    events: ['school_event', 'mark_training', 'school_memories', 'school_rooftop'],
    bg: 'school',
    explored: false
  },
  schoolBasement: {
    id: 'schoolBasement',
    name: 'School Basement',
    description: 'The dark basement of the school. Strange symbols are drawn on the floor. The air is thick with demonic energy.',
    connections: ['school'],
    encounters: ['shadow', 'ghost'],
    events: ['basement_ritual'],
    bg: 'basement',
    explored: false
  },
  park: {
    id: 'park',
    name: 'Peaceful Park',
    description: 'A small park with a fountain. The water reflects an unnatural blue glow. A magnificent cherry tree stands at the center, its petals shimmering with otherworldly light.',
    connections: ['street', 'shrine'],
    encounters: ['shadow', 'wraith'],
    events: ['park_meeting', 'lisa_secret', 'cherry_blossom', 'park_reflection'],
    bg: 'park',
    explored: false
  },
  shrine: {
    id: 'shrine',
    name: 'Ancient Shrine',
    description: 'An old shrine hidden in the forest behind the park. The torii gate is cracked but still stands. Sacred energy flows through this place, connecting the human and demon realms.',
    connections: ['park', 'demonWorld'],
    encounters: ['demon', 'wraith', 'harpy'],
    events: ['shrine_discovery', 'brown_truth', 'final_prep'],
    bg: 'shrine',
    explored: false
  },
  shoppingDistrict: {
    id: 'shoppingDistrict',
    name: 'Shopping District',
    description: 'The main shopping area of Mikage-cho. Shops line the street, but many are boarded up since the "incidents" began. A mysterious shop glows with inviting light among the darkness.',
    connections: ['street', 'hospital'],
    events: ['shop_event', 'mysterious_merchant'],
    bg: 'shopping',
    explored: false
  },
  hospital: {
    id: 'hospital',
    name: 'Mikage General Hospital',
    description: 'The local hospital. Many patients have fallen into mysterious comas since the incidents. Their dreams seem to leak into reality, creating pockets of supernatural energy.',
    connections: ['shoppingDistrict'],
    encounters: ['ghost', 'wraith'],
    events: ['hospital_event', 'hospital_patients', 'hospital_doctor'],
    bg: 'hospital',
    explored: false
  },
  demonWorld: {
    id: 'demonWorld',
    name: 'The Demon Realm',
    description: 'A twisted landscape of floating islands and crimson skies. The laws of physics don\'t apply here. This is where the demons come from — and where Clomp\'s mother once ruled as queen.',
    connections: ['shrine', 'finalArea'],
    encounters: ['demon', 'knight', 'harpy'],
    events: ['demon_realm_entry', 'demon_encounter_peaceful', 'demon_world_mother'],
    bg: 'demonworld',
    explored: false
  },
  finalArea: {
    id: 'finalArea',
    name: 'The Void Between Worlds',
    description: 'The space between reality and the demon realm. Here, all possibilities exist simultaneously. Clomp\'s blue hair glows brilliantly in this place, a beacon against the primordial darkness.',
    connections: ['demonWorld'],
    encounters: ['knight', 'demon'],
    events: ['final_confrontation'],
    bg: 'void',
    explored: false
  }
};

// ============ SCENES (NARRATIVE) ============
export const SCENES: Record<string, Scene> = {
  // === CHAPTER 1: AWAKENING ===
  intro: {
    id: 'intro',
    location: 'bedroom',
    dialogue: [
      { speaker: 'Narrator', text: 'In the quiet town of Mikage-cho, where cherry blossoms fall like snow, there lives a boy unlike any other...' },
      { speaker: 'Narrator', text: 'His name is Clomp. His hair, blue as the deepest ocean, flows all the way down to his heels — a mark of his otherworldly nature.' },
      { speaker: 'Narrator', text: 'Strange things have been happening in Mikage-cho lately. People collapsing in the streets, shadows moving where no shadows should be...' },
      { speaker: 'Clomp', text: '...Another nightmare. I can feel it even now, fading like morning mist.' },
      { speaker: 'Clomp', text: 'The blue flames... the voice calling my name from somewhere deep inside...' },
      { speaker: 'Clomp', text: 'I need to get ready for school. Lisa said she\'d walk with me today.' },
    ],
    nextScene: 'wake_up_event'
  },
  wake_up_event: {
    id: 'wake_up_event',
    location: 'hallway',
    dialogue: [
      { speaker: 'Narrator', text: 'As you step into the hallway, you notice something strange. The shadows on the wall seem to writhe and twist on their own.' },
      { speaker: 'Clomp', text: 'What the...? The shadows are moving. This is just like my dream...' },
      { speaker: '???', text: 'Clomp! Wait up!' },
      { speaker: 'Narrator', text: 'A girl with short brown hair comes running down the hall. This is Lisa, your childhood friend.' },
      { speaker: 'Lisa', text: 'There you are! I was worried you\'d oversleep again. Your hair gets tangled in the blankets, doesn\'t it?' },
      { speaker: 'Clomp', text: 'Lisa... have you noticed anything strange lately? The shadows... they seem alive.' },
      { speaker: 'Lisa', text: 'Shadows? Well... I did hear about those incidents. People suddenly collapsing and falling into comas...' },
      { speaker: 'Lisa', text: 'But shadows coming alive? That sounds like something from one of your weird dreams, Clomp.' },
      { speaker: 'Clomp', text: 'No, I\'m serious. Look — right there!' },
      { speaker: 'Narrator', text: 'You point to the corner where a shadow seems to pulse with dark energy. For a moment, Lisa\'s eyes widen.' },
      { speaker: 'Lisa', text: 'I... I think I saw something too. Just for a second. Let\'s get to school. Maybe Mark will know what\'s going on.' },
    ],
    nextScene: 'street_walk'
  },
  street_walk: {
    id: 'street_walk',
    location: 'street',
    dialogue: [
      { speaker: 'Narrator', text: 'You walk through the streets of Mikage-cho with Lisa. The morning sun feels unusually cold.' },
      { speaker: 'Lisa', text: 'Hey Clomp... can I ask you something? Why is your hair blue? I mean, it\'s naturally blue, right?' },
      { speaker: 'Clomp', text: 'Yeah... I\'ve had it since I was born. My parents never explained why. It\'s just... how I am.' },
      { speaker: 'Lisa', text: 'It\'s beautiful, you know. Like the sky after rain. I\'ve always thought so.' },
      { speaker: 'Clomp', text: '...Thanks, Lisa.' },
      { speaker: 'Narrator', text: 'As you approach the school gates, you see Mark waiting for you. His hand rests on his kendo shinai.' },
      { speaker: 'Mark', text: 'Finally! You two are late. And Clomp, you need to tie your hair back, it\'s dragging on the ground.' },
      { speaker: 'Clomp', text: 'Good morning to you too, Mark.' },
      { speaker: 'Mark', text: 'Listen, something weird happened last night. I was training at the dojo and I saw... something.' },
      { speaker: 'Mark', text: 'A figure made of pure darkness. It was in the school basement. I tried to confront it but...' },
      { speaker: 'Lisa', text: 'But what?' },
      { speaker: 'Mark', text: 'It spoke to me. It said "The time of awakening is near." Then I blacked out.' },
      { speaker: 'Clomp', text: '...The awakening. That\'s what the voice in my dreams keeps saying.' },
      { speaker: 'Mark', text: 'Your dreams? Clomp, what are you talking about?' },
      { speaker: 'Clomp', text: 'I\'ve been having these dreams... blue flames, a voice calling me... and a feeling that something inside me is waking up.' },
    ],
    nextScene: 'school_classroom'
  },
  school_classroom: {
    id: 'school_classroom',
    location: 'school',
    dialogue: [
      { speaker: 'Narrator', text: 'The school day passes uneventfully, but you can feel the tension. Whispers circulate about the "Mikage-cho incidents."' },
      { speaker: 'Narrator', text: 'After classes, you, Lisa, and Mark gather in the courtyard.' },
      { speaker: 'Mark', text: 'We need to check the basement. Whatever I saw last night, it\'s connected to these incidents.' },
      { speaker: 'Lisa', text: 'I agree. If people are in danger, we can\'t just ignore it.' },
      { speaker: 'Clomp', text: 'I feel it too. Something is calling me down there. My hair... it\'s tingling.' },
      { speaker: 'Narrator', text: 'Indeed, your long blue hair seems to shimmer with an inner light, as if responding to some unseen force.' },
      { speaker: 'Mark', text: 'Alright, let\'s go. But be careful, both of you.' },
    ],
    nextScene: 'basement_ritual'
  },
  basement_ritual: {
    id: 'basement_ritual',
    location: 'schoolBasement',
    dialogue: [
      { speaker: 'Narrator', text: 'The basement is dark and cold. Strange symbols glow faintly on the floor — a summoning circle.' },
      { speaker: 'Lisa', text: 'What is this place? These symbols... they look ancient.' },
      { speaker: 'Mark', text: 'This wasn\'t here yesterday. Someone — or something — created this.' },
      { speaker: 'Narrator', text: 'Suddenly, the symbols flare with dark light. The air grows heavy. A presence fills the room.' },
      { speaker: '???', text: 'Hee hee hee... So you\'ve come. The blue-haired one... I\'ve been waiting for you.' },
      { speaker: 'Narrator', text: 'A figure materializes from the shadows — a demon with burning red eyes and a twisted smile.' },
      { speaker: 'Demon', text: 'I am a herald of Aciel. My master sends his regards. The barrier between worlds grows thin, boy.' },
      { speaker: 'Clomp', text: 'What do you want from me?' },
      { speaker: 'Demon', text: 'Want? We want everything. Your world, your souls, your reality. And you, blue-haired child, are the key.' },
      { speaker: 'Demon', text: 'The power within you... the Persona... it\'s what holds the barrier together. And we\'re going to take it.' },
      { speaker: 'Mark', text: 'Stay back! I\'ll handle this!' },
      { speaker: 'Narrator', text: 'Mark charges forward with his shinai, but the demon swats him aside with contemptuous ease.' },
      { speaker: 'Lisa', text: 'Mark! Clomp, do something! Your hair is glowing!' },
      { speaker: 'Narrator', text: 'She\'s right. Your blue hair blazes with azure light. Deep within you, something stirs — an ancient power awakening.' },
      { speaker: 'Voice Within', text: 'I am thou... thou art I... We have waited long for this moment, Clomp.' },
      { speaker: 'Voice Within', text: 'I am Orpheus. The bard who challenged death itself. Take my power and protect those you love!' },
      { speaker: 'Clomp', text: 'I... I can feel it! This power... it\'s mine! No — WE are one!' },
      { speaker: 'Narrator', text: 'A figure of light appears behind Clomp — Orpheus, the legendary musician, its lyre glowing with divine power!' },
      { speaker: 'Clomp', text: 'I won\'t let you hurt anyone! ORPHEUS!' },
    ],
    combat: 'basement_battle',
    nextScene: 'after_first_battle'
  },
  after_first_battle: {
    id: 'after_first_battle',
    location: 'schoolBasement',
    dialogue: [
      { speaker: 'Narrator', text: 'The demon dissolves into shadow, screaming as Orpheus\'s light consumes it.' },
      { speaker: 'Clomp', text: 'Is everyone okay?' },
      { speaker: 'Mark', text: 'I\'m fine... but what WAS that? Clomp, you had some kind of... spirit behind you?' },
      { speaker: 'Lisa', text: 'It was beautiful. Like an angel of music. Clomp, you have a Persona!' },
      { speaker: 'Clomp', text: 'A Persona... Orpheus told me it\'s the power of my soul given form. It\'s what protects the barrier between worlds.' },
      { speaker: 'Mark', text: 'So those demons want to destroy the barrier? And you\'re the only one who can stop them?' },
      { speaker: 'Clomp', text: 'It seems so. But I can\'t do it alone.' },
      { speaker: 'Narrator', text: 'As if in response, both Lisa and Mark begin to glow with inner light.' },
      { speaker: 'Lisa', text: 'What\'s happening to me?!' },
      { speaker: 'Mark', text: 'I feel... something awakening inside me too!' },
      { speaker: 'Voice (Lisa)', text: 'I am thou... Jack Frost... Let us bring the cold truth to those who would harm this world!' },
      { speaker: 'Voice (Mark)', text: 'I am thou... Ifrit... Burn away the darkness with the flames of justice!' },
      { speaker: 'Narrator', text: 'Lisa awakens to the power of Jack Frost, while Mark channels the fury of Ifrit. Your party is complete.' },
      { speaker: 'Clomp', text: 'We all have Personas... We\'re connected to this somehow. We need to find out why.' },
      { speaker: 'Mark', text: 'Then let\'s investigate. That demon mentioned "Aciel" — whoever that is, they\'re behind all this.' },
      { speaker: 'Lisa', text: 'Let\'s check the park first. I\'ve seen strange lights there at night.' },
    ],
    nextScene: 'chapter1_hub'
  },

  // === CHAPTER 1 HUB - EXPLORATION ===
  chapter1_hub: {
    id: 'chapter1_hub',
    location: 'street',
    dialogue: [
      { speaker: 'Narrator', text: 'The streets of Mikage-cho feel different now. You can see the threads of demonic energy woven through reality.' },
      { speaker: 'Narrator', text: 'With your new Persona abilities, you can sense where the barriers are weakest. Explore the town and find the source of these disturbances.' },
      { speaker: 'Clomp', text: 'We need to find the crystals that anchor the barrier. Brown said they\'re scattered across the town.' },
      { speaker: 'Lisa', text: 'Let\'s start by exploring. The park had strange lights — maybe there\'s a clue there.' },
      { speaker: 'Mark', text: 'I\'ll check the school basement too. More of those symbols might have appeared.' },
      { speaker: 'Narrator', text: 'Chapter 1: The Awakening — Explore Mikage-cho and uncover the mystery of the barrier.' },
    ],
    nextScene: 'exploration'
  },

  // === PARK EVENT ===
  park_meeting: {
    id: 'park_meeting',
    location: 'park',
    dialogue: [
      { speaker: 'Narrator', text: 'The park fountain glows with an eerie blue light. The water seems to show visions...' },
      { speaker: 'Lisa', text: 'Look! In the water — I can see something. It\'s like a window into another place.' },
      { speaker: 'Narrator', text: 'In the fountain\'s reflection, you see a twisted version of Mikage-cho — buildings crumbling, skies red with demonic fire.' },
      { speaker: 'Clomp', text: 'That\'s what will happen to our world if we fail. That\'s the demon realm overlapping with ours.' },
      { speaker: '???', text: 'You understand now, don\'t you, blue-haired child?' },
      { speaker: 'Narrator', text: 'A boy appears from behind a tree. He wears a strange uniform and has knowing eyes.' },
      { speaker: 'Brown', text: 'My name is Brown. I\'ve been watching you, Clomp. You\'re not the only one with a Persona.' },
      { speaker: 'Brown', text: 'I transferred to this school specifically because of the disturbances. The barrier is failing.' },
      { speaker: 'Clomp', text: 'Who are you really? You seem to know a lot about this.' },
      { speaker: 'Brown', text: 'I\'m a Persona user, like you. My Persona is Thor — the god of thunder. And I know who\'s behind all this.' },
      { speaker: 'Brown', text: 'Aciel is a demon lord from the deepest circle of the demon realm. It wants to merge both worlds into one.' },
      { speaker: 'Brown', text: 'If it succeeds, humanity will be enslaved or destroyed. Only a group of Persona users can stop it.' },
      { speaker: 'Mark', text: 'Then count me in. I\'m not letting some demon push us around.' },
      { speaker: 'Lisa', text: 'Me too. We\'re in this together.' },
      { speaker: 'Brown', text: 'Good. Then we need to find the three crystals that anchor the barrier. They\'re scattered across Mikage-cho.' },
      { speaker: 'Narrator', text: 'Suddenly, shadows begin to coalesce around the fountain. More demons are coming!' },
      { speaker: 'Brown', text: 'They\'ve found us! Get ready!' },
    ],
    combat: 'park_battle',
    nextScene: 'after_park_battle'
  },
  after_park_battle: {
    id: 'after_park_battle',
    location: 'park',
    dialogue: [
      { speaker: 'Narrator', text: 'The demons are defeated. Among their remains, a blue crystal pulses with light.' },
      { speaker: 'Brown', text: 'The first crystal! It was hidden here all along, masked by demonic energy.' },
      { speaker: 'Clomp', text: 'It resonates with my hair... I can feel the barrier strengthening where it touches.' },
      { speaker: 'Lisa', text: 'One down, two to go. Where are the others?' },
      { speaker: 'Brown', text: 'The second is in the shrine behind the park. The third... in the demon realm itself.' },
      { speaker: 'Mark', text: 'The demon realm? That sounds like suicide.' },
      { speaker: 'Brown', text: 'Not if we\'re prepared. The shrine will give us the means to enter safely.' },
      { speaker: 'Clomp', text: 'Then let\'s head to the shrine. We can\'t waste time.' },
    ],
    nextScene: 'chapter2_hub'
  },

  // === CHAPTER 2: THE SHRINE ===
  chapter2_hub: {
    id: 'chapter2_hub',
    location: 'park',
    dialogue: [
      { speaker: 'Narrator', text: 'With the first crystal secured, your party grows stronger. The path to the ancient shrine lies ahead.' },
      { speaker: 'Narrator', text: 'But the demons grow bolder. Shadows lurk in every corner of Mikage-cho.' },
      { speaker: 'Narrator', text: 'Chapter 2: The Shrine — Find the second crystal and learn the truth of the barrier\'s origins.' },
      { speaker: 'Brown', text: 'The shrine holds many secrets. Be prepared for anything.' },
    ],
    nextScene: 'exploration'
  },
  shrine_discovery: {
    id: 'shrine_discovery',
    location: 'shrine',
    dialogue: [
      { speaker: 'Narrator', text: 'The ancient shrine stands in a clearing deep in the forest. The torii gate is cracked but still standing, barely holding back the demonic energy.' },
      { speaker: 'Brown', text: 'This shrine was built centuries ago by the first Persona users. It\'s one of the anchor points of the barrier.' },
      { speaker: 'Lisa', text: 'It feels... sad. Like it\'s been waiting for someone to come back.' },
      { speaker: 'Clomp', text: 'I can feel the second crystal inside. But something guards it...' },
      { speaker: 'Narrator', text: 'The ground shakes. From beneath the shrine, a massive figure emerges — a Dark Knight in blackened armor.' },
      { speaker: 'Dark Knight', text: 'None shall claim the crystal. I am its guardian, bound by oath for a thousand years.' },
      { speaker: 'Mark', text: 'A thousand years? That\'s... a long time to be stuck guarding a rock.' },
      { speaker: 'Dark Knight', text: 'Silence, mortal! You do not understand the weight of duty. I gave my life for this oath, and in death, I continue my vigil.' },
      { speaker: 'Clomp', text: 'We\'re not here to steal it. We need it to save our world — YOUR world too.' },
      { speaker: 'Dark Knight', text: 'Words are wind. Prove your worth in combat, and the crystal is yours. Fail, and join me in eternal guardianship!' },
    ],
    combat: 'shrine_battle',
    nextScene: 'after_shrine_battle'
  },
  after_shrine_battle: {
    id: 'after_shrine_battle',
    location: 'shrine',
    dialogue: [
      { speaker: 'Narrator', text: 'The Dark Knight falls to its knees, its armor cracking and dissolving into light.' },
      { speaker: 'Dark Knight', text: 'You are... strong. Perhaps... perhaps I can finally rest...' },
      { speaker: 'Clomp', text: 'You fought honorably. Rest now. Your duty is done.' },
      { speaker: 'Dark Knight', text: 'Thank you... young one. Take the crystal. And beware... Aciel is not what it seems...' },
      { speaker: 'Narrator', text: 'The knight dissolves into motes of light. The second crystal floats up from the shrine\'s altar.' },
      { speaker: 'Brown', text: 'Two crystals secured. The last one is in the demon realm. We need to open the gate.' },
      { speaker: 'Narrator', text: 'Brown places both crystals in slots on the torii gate. The crack seals, and the gate glows with power.' },
      { speaker: 'Brown', text: 'The gate is open. But before we enter... we should prepare. The demon realm is dangerous.' },
      { speaker: 'Lisa', text: 'Clomp, are you okay? You\'ve been quiet since the knight said that thing about Aciel.' },
      { speaker: 'Clomp', text: 'I just... I have a feeling that this is more personal than we think. My hair, my power... it\'s all connected somehow.' },
      { speaker: 'Lisa', text: 'Whatever it is, we\'ll face it together. Right, everyone?' },
      { speaker: 'Mark', text: 'Damn right.' },
      { speaker: 'Brown', text: 'Agreed. Let\'s rest and prepare, then enter the demon realm at dawn.' },
    ],
    nextScene: 'chapter3_hub'
  },

  // === CHAPTER 3: THE DEMON REALM ===
  chapter3_hub: {
    id: 'chapter3_hub',
    location: 'shrine',
    dialogue: [
      { speaker: 'Narrator', text: 'The gate to the demon realm stands open. Beyond it lies a world of nightmare and wonder.' },
      { speaker: 'Narrator', text: 'Prepare yourselves for the final challenge. The third crystal — and the truth about Clomp\'s power — awaits within.' },
      { speaker: 'Narrator', text: 'Chapter 3: The Demon Realm — Enter the world of demons and discover Clomp\'s true heritage.' },
      { speaker: 'Clomp', text: 'This is where my mother came from. I can feel her presence... faint, but real.' },
    ],
    nextScene: 'exploration'
  },
  demon_realm_entry: {
    id: 'demon_realm_entry',
    location: 'demonWorld',
    dialogue: [
      { speaker: 'Narrator', text: 'You step through the gate and into the demon realm. The sky is crimson, the ground floats in fragments among void.' },
      { speaker: 'Mark', text: 'This place... it\'s like nothing I\'ve ever seen. The rules of reality don\'t apply here.' },
      { speaker: 'Lisa', text: 'I can feel so many presences... demons everywhere. But also... something else. Something familiar.' },
      { speaker: 'Clomp', text: 'My hair... it\'s reacting. Pulling me in a direction. The third crystal is that way.' },
      { speaker: 'Brown', text: 'Stay alert. In this realm, demons are stronger. Their true forms are unleashed here.' },
      { speaker: 'Narrator', text: 'As you venture deeper, the landscape shifts. Towering spires of black crystal rise from the void.' },
      { speaker: '???', text: 'Welcome home, Clomp.' },
      { speaker: 'Narrator', text: 'Aciel appears — a towering demon with wings of shadow and eyes like dying stars.' },
      { speaker: 'Aciel', text: 'Did you really think you were just a human boy? Look at yourself. Look at your hair. You\'re one of US.' },
      { speaker: 'Clomp', text: 'What... what are you talking about?' },
      { speaker: 'Aciel', text: 'You\'re a child of the demon realm, Clomp. Born of a demon mother and a human father. That blue hair is the mark of your heritage.' },
      { speaker: 'Lisa', text: 'That\'s a lie! Clomp is our friend!' },
      { speaker: 'Aciel', text: 'Am I lying? Then why does his Persona burn blue? Why does the barrier respond to him? He was BORN to bring it down.' },
      { speaker: 'Clomp', text: 'No... that can\'t be... My parents... they would never...' },
      { speaker: 'Aciel', text: 'Your mother was a demon queen who fell in love with a human. She hid you in the human world to protect you. But your destiny was always here.' },
      { speaker: 'Aciel', text: 'Join me, Clomp. Together, we can reshape both worlds. No more hiding. No more pretending to be human.' },
      { speaker: 'Mark', text: 'Clomp, don\'t listen to it! Whatever you are, you\'re our friend!' },
      { speaker: 'Brown', text: 'Heritage doesn\'t define you, Clomp. Your choices do.' },
      { speaker: 'Clomp', text: '...Even if I am part demon... I was raised human. I love this world. I love my friends.' },
      { speaker: 'Clomp', text: 'I won\'t let you destroy it, Aciel! My blue hair is my heritage, yes — but my heart is HUMAN!' },
      { speaker: 'Narrator', text: 'Clomp\'s hair blazes with brilliant blue fire. Orpheus appears, stronger than ever, joined by the Personas of his friends!' },
      { speaker: 'Aciel', text: 'Foolish child! Then you will die with the humans!' },
    ],
    combat: 'boss_aciel',
    nextScene: 'after_aciel'
  },
  after_aciel: {
    id: 'after_aciel',
    location: 'demonWorld',
    dialogue: [
      { speaker: 'Narrator', text: 'Aciel screams as the combined power of four Personas tears through its form.' },
      { speaker: 'Aciel', text: 'Impossible... a half-blood... defeating ME...?' },
      { speaker: 'Clomp', text: 'It\'s over, Aciel. The barrier will hold. Both worlds will be safe.' },
      { speaker: 'Aciel', text: 'You think this is over? I am but a servant... the true darkness... Erebus... it awakens...' },
      { speaker: 'Narrator', text: 'Aciel dissolves, but its final words hang in the air like a death sentence.' },
      { speaker: 'Brown', text: 'Erebus... the primordial darkness. If that\'s awakening, Aciel was just the beginning.' },
      { speaker: 'Narrator', text: 'The third crystal appears where Aciel fell, pulsing with intense light.' },
      { speaker: 'Lisa', text: 'Clomp... are you okay? After what Aciel said...' },
      { speaker: 'Clomp', text: 'I\'m fine. Whatever I am — demon, human, or both — I know who I am. I\'m Clomp. And I\'ll protect everyone.' },
      { speaker: 'Mark', text: 'That\'s the Clomp I know.' },
      { speaker: 'Narrator', text: 'But the ground begins to shake violently. The demon realm itself starts to collapse.' },
      { speaker: 'Brown', text: 'Erebus is awakening! We need to get to the Void Between Worlds — it\'s the only place we can face it!' },
    ],
    nextScene: 'chapter4_hub'
  },

  // === CHAPTER 4: FINAL ===
  chapter4_hub: {
    id: 'chapter4_hub',
    location: 'demonWorld',
    dialogue: [
      { speaker: 'Narrator', text: 'The demon realm crumbles around you. Erebus, the primordial darkness, threatens to consume all existence.' },
      { speaker: 'Narrator', text: 'This is the final battle. Everything depends on what happens next.' },
      { speaker: 'Narrator', text: 'Chapter 4: The Void — Face the primordial darkness and decide the fate of both worlds.' },
      { speaker: 'Clomp', text: 'Everyone... this is it. The final battle. Are you with me?' },
      { speaker: 'Lisa', text: 'Until the very end.' },
      { speaker: 'Mark', text: 'Let\'s show them what we\'re made of!' },
      { speaker: 'Brown', text: 'For your mother. For both worlds. Let\'s go.' },
    ],
    nextScene: 'exploration'
  },
  final_confrontation: {
    id: 'final_confrontation',
    location: 'finalArea',
    dialogue: [
      { speaker: 'Narrator', text: 'The Void Between Worlds. A space of infinite possibility and infinite darkness. Here, reality is raw and unformed.' },
      { speaker: 'Narrator', text: 'In the center of the void, a massive presence unfolds — EREBUS, the darkness that existed before creation.' },
      { speaker: 'Erebus', text: '...So. The children of light have come to challenge the primordial dark.' },
      { speaker: 'Erebus', text: 'I existed before your gods. Before your worlds. Before light itself. And I will exist after all of you are gone.' },
      { speaker: 'Clomp', text: 'We won\'t let you erase everything. Life, love, friendship — these things are real!' },
      { speaker: 'Erebus', text: 'Real? Everything is temporary. All things return to darkness eventually. I am merely... patient.' },
      { speaker: 'Brown', text: 'Maybe everything ends in darkness. But that doesn\'t mean the light between doesn\'t matter.' },
      { speaker: 'Lisa', text: 'We\'ll shine as bright as we can, for as long as we can. That\'s what it means to be alive.' },
      { speaker: 'Mark', text: 'And we\'ll make sure you don\'t snuff out that light today, Erebus!' },
      { speaker: 'Clomp', text: 'Everyone... thank you. Let\'s do this. Together. ORPHEUS — FULL POWER!' },
      { speaker: 'Narrator', text: 'All four Personas manifest in full glory. Orpheus, Jack Frost, Ifrit, and Thor — their combined light pushes back the primordial dark!' },
      { speaker: 'Erebus', text: 'Fools! You cannot defeat the DARKNESS ITSELF!' },
      { speaker: 'Clomp', text: 'We don\'t have to defeat darkness. We just have to prove that light is worth fighting for!' },
      { speaker: 'Narrator', text: 'Clomp\'s blue hair blazes like a beacon. The power of his dual heritage — human and demon — combines with his friends\' bonds.' },
      { speaker: 'Narrator', text: 'This is the final battle. Everything you\'ve fought for comes down to this moment.' },
    ],
    combat: 'boss_erebus',
    nextScene: 'ending'
  },
  ending: {
    id: 'ending',
    location: 'street',
    dialogue: [
      { speaker: 'Narrator', text: 'Erebus lets out a soundless scream as the combined light of four Personas — fueled by the bonds of friendship — pierces the primordial darkness.' },
      { speaker: 'Erebus', text: 'This... this is impossible... I am the END of all things...' },
      { speaker: 'Clomp', text: 'No. You\'re the BEGINNING. Without darkness, there is no light. Without the end, there is no new beginning.' },
      { speaker: 'Clomp', text: 'We\'re not destroying you, Erebus. We\'re putting you back to sleep. The darkness will always exist... but so will the light.' },
      { speaker: 'Narrator', text: 'Erebus fades, not destroyed but contained. The void begins to heal. The barrier between worlds is restored.' },
      { speaker: 'Narrator', text: 'You find yourself back in Mikage-cho. The cherry blossoms are falling again. The sun is warm.' },
      { speaker: 'Lisa', text: 'We did it... We actually did it.' },
      { speaker: 'Mark', text: 'I can\'t believe we survived that. But... it feels like it was all worth it.' },
      { speaker: 'Brown', text: 'The barrier is restored. The demon realm is sealed. Mikage-cho is safe.' },
      { speaker: 'Brown', text: 'Clomp... you should know. I\'m not just a transfer student. I\'m a guardian, assigned to watch over the barrier.' },
      { speaker: 'Brown', text: 'And you... you\'re something special. Half-demon, half-human, with a power that bridges both worlds.' },
      { speaker: 'Clomp', text: 'I know what I am now. And I\'m at peace with it. I\'m Clomp. That\'s enough.' },
      { speaker: 'Lisa', text: 'Hey Clomp... your hair. It\'s glowing.' },
      { speaker: 'Narrator', text: 'Clomp\'s long blue hair shimmers with a gentle light — not the blazing fire of battle, but a soft, peaceful glow.' },
      { speaker: 'Clomp', text: 'I think... I think my Persona has evolved. Orpheus... no. Something new.' },
      { speaker: 'Narrator', text: 'Behind Clomp, a new figure appears — not Orpheus, but something greater. A being of pure blue light, with wings like flowing hair.' },
      { speaker: 'Narrator', text: 'It is the manifestation of Clomp\'s true self — the bridge between worlds, the harmony of light and dark, human and demon.' },
      { speaker: 'Clomp', text: 'I\'ll keep watching over this world. Both worlds. As long as my hair flows blue, the barrier will hold.' },
      { speaker: 'Lisa', text: 'And we\'ll be right here with you. Always.' },
      { speaker: 'Mark', text: 'Damn right. Partners till the end.' },
      { speaker: 'Brown', text: 'The guardians will continue their watch. But now... we have friends to help us.' },
      { speaker: 'Narrator', text: 'And so, in the quiet town of Mikage-cho, where cherry blossoms fall like snow, a boy with hair blue as the deepest ocean walks among his friends.' },
      { speaker: 'Narrator', text: 'The world is safe. The barrier holds. And somewhere deep within, Orpheus plays a song of peace.' },
      { speaker: 'Narrator', text: 'This is the story of Clomp — the boy who bridged two worlds with nothing but the power of friendship and the light in his blue hair.' },
      { speaker: 'Narrator', text: 'THE END' },
      { speaker: 'Narrator', text: 'Thank you for playing CLOMP: REVELATIONS' },
    ],
    nextScene: 'credits'
  },
  credits: {
    id: 'credits',
    location: 'street',
    dialogue: [
      { speaker: 'Narrator', text: '=== CLOMP: REVELATIONS ===' },
      { speaker: 'Narrator', text: 'A Persona-inspired RPG' },
      { speaker: 'Narrator', text: 'Starring Clomp, Lisa, Mark, and Brown' },
      { speaker: 'Narrator', text: 'Personas: Orpheus, Jack Frost, Ifrit, Thor, Metatron' },
      { speaker: 'Narrator', text: 'Thank you for playing!' },
    ],
    nextScene: 'title_return'
  },

  // === HOSPITAL EVENT ===
  hospital_event: {
    id: 'hospital_event',
    location: 'hospital',
    dialogue: [
      { speaker: 'Narrator', text: 'The hospital is eerily quiet. Rows of comatose patients lie in beds, their faces twisted in silent screams.' },
      { speaker: 'Lisa', text: 'These people... their souls are being drained. I can feel it.' },
      { speaker: 'Brown', text: 'The demons are feeding on human dream energy. Each coma victim gives them more power.' },
      { speaker: 'Clomp', text: 'We have to stop this. My Persona can purify the demonic energy around them.' },
      { speaker: 'Narrator', text: 'You channel Orpheus\'s power, and blue light washes over the patients. Slowly, their faces relax.' },
      { speaker: 'Mark', text: 'It\'s working! But there are so many of them...' },
      { speaker: 'Brown', text: 'We can save these people, but we need to cut off the source. The demons are being directed from the demon realm.' },
      { speaker: 'Narrator', text: 'As you purify the last patient in the ward, a ghost materializes — the demon controlling this area.' },
      { speaker: 'Ghost', text: 'You dare interfere with our harvest?! These souls belong to Aciel now!' },
    ],
    combat: 'hospital_battle',
    nextScene: 'after_hospital'
  },
  after_hospital: {
    id: 'after_hospital',
    location: 'hospital',
    dialogue: [
      { speaker: 'Narrator', text: 'The ghost dissipates. Around you, patients begin to stir, waking from their comas.' },
      { speaker: 'Lisa', text: 'They\'re waking up! It worked!' },
      { speaker: 'Clomp', text: 'We saved them. But there are more victims out there. We need to keep going.' },
      { speaker: 'Brown', text: 'The shrine. That\'s our next destination. The second crystal is there, and it will help us protect more people.' },
    ],
    nextScene: 'exploration'
  },

  // === SHOP EVENT ===
  shop_event: {
    id: 'shop_event',
    location: 'shoppingDistrict',
    dialogue: [
      { speaker: 'Narrator', text: 'The shopping district is mostly abandoned, but one shop remains open — a strange little store that wasn\'t here before.' },
      { speaker: '???', text: 'Welcome, Persona users! I\'ve been expecting you.' },
      { speaker: 'Narrator', text: 'An old man behind the counter smiles knowingly. The shop is filled with strange items and glowing crystals.' },
      { speaker: 'Shopkeeper', text: 'I am the Velvet Room\'s agent in this world. I provide supplies to those who fight for the barrier.' },
      { speaker: 'Shopkeeper', text: 'Take these. You\'ll need them for what lies ahead.' },
      { speaker: 'Narrator', text: 'The shopkeeper gives you healing potions and spirit potions.' },
      { speaker: 'Shopkeeper', text: 'Remember, young Clomp — your dual nature is not a curse. It is your greatest strength.' },
      { speaker: 'Clomp', text: 'How do you know about...?' },
      { speaker: 'Shopkeeper', text: 'Heh heh... I know many things. Now go. The darkness grows stronger with each passing hour.' },
    ],
    nextScene: 'exploration'
  },

  // === COMBAT SCENE WRAPPERS ===
  basement_battle: {
    id: 'basement_battle',
    location: 'schoolBasement',
    dialogue: [],
    combat: 'basement_battle',
    nextScene: 'after_first_battle'
  },
  park_battle: {
    id: 'park_battle',
    location: 'park',
    dialogue: [],
    combat: 'park_battle',
    nextScene: 'after_park_battle'
  },
  shrine_battle: {
    id: 'shrine_battle',
    location: 'shrine',
    dialogue: [],
    combat: 'shrine_battle',
    nextScene: 'after_shrine_battle'
  },
  boss_aciel: {
    id: 'boss_aciel',
    location: 'demonWorld',
    dialogue: [],
    combat: 'boss_aciel',
    nextScene: 'after_aciel'
  },
  boss_erebus: {
    id: 'boss_erebus',
    location: 'finalArea',
    dialogue: [],
    combat: 'boss_erebus',
    nextScene: 'ending'
  },
  hospital_battle: {
    id: 'hospital_battle',
    location: 'hospital',
    dialogue: [],
    combat: 'hospital_battle',
    nextScene: 'after_hospital'
  },

  // === SIDE EVENTS - EXTENDED CONTENT ===
  clomp_dream: {
    id: 'clomp_dream',
    location: 'bedroom',
    dialogue: [
      { speaker: 'Narrator', text: 'You return to your room and lie down. Sleep comes quickly, and with it, the dreams...' },
      { speaker: 'Narrator', text: 'You stand in an endless blue void. Your hair flows around you like water, defying gravity.' },
      { speaker: 'Orpheus', text: 'Clomp... Do you remember? Before you were born, your mother sang to you in the demon realm.' },
      { speaker: 'Orpheus', text: 'She loved a human — your father. Their love was forbidden, but it was real.' },
      { speaker: 'Clomp', text: 'My mother... was a demon?' },
      { speaker: 'Orpheus', text: 'A demon queen. She gave up her throne to be with your father. She hid you in the human world to protect you from Aciel.' },
      { speaker: 'Orpheus', text: 'Your blue hair is her legacy — the mark of demon royalty. But your heart... your heart is entirely human.' },
      { speaker: 'Clomp', text: 'Why didn\'t they tell me?' },
      { speaker: 'Orpheus', text: 'Because the truth would have awakened you too early. Aciel would have found you. But now... you are ready.' },
      { speaker: 'Orpheus', text: 'Remember, Clomp: you are the bridge between worlds. Neither fully human nor fully demon. You are something new.' },
      { speaker: 'Clomp', text: '...I understand. Thank you, Orpheus.' },
      { speaker: 'Narrator', text: 'You wake up with tears on your cheeks, but also with a new understanding of who you are.' },
    ],
    nextScene: 'exploration'
  },
  lisa_secret: {
    id: 'lisa_secret',
    location: 'park',
    dialogue: [
      { speaker: 'Narrator', text: 'Lisa seems troubled. She sits on a park bench, staring at the fountain.' },
      { speaker: 'Clomp', text: 'Lisa? What\'s wrong?' },
      { speaker: 'Lisa', text: 'Clomp... I need to tell you something. About why I can see the shadows too.' },
      { speaker: 'Lisa', text: 'When I was little, I almost died. I fell into the river behind the school. I was underwater for... a long time.' },
      { speaker: 'Lisa', text: 'They say I was dead for three minutes. But then I woke up. And since then... I\'ve seen things. Shadows that move. Whispers in the dark.' },
      { speaker: 'Clomp', text: 'Lisa... I had no idea.' },
      { speaker: 'Lisa', text: 'I think... I think when I died, part of my soul went somewhere else. And when I came back, I brought something with me.' },
      { speaker: 'Lisa', text: 'That\'s why Jack Frost chose me. Because I\'ve already been to the other side.' },
      { speaker: 'Clomp', text: 'You\'re still you, Lisa. Whatever happened, you\'re my best friend.' },
      { speaker: 'Lisa', text: '...Thank you, Clomp. That means everything.' },
      { speaker: 'Narrator', text: 'Lisa smiles, and for a moment, you see a faint blue glow around her — the mark of someone who has touched death and returned.' },
    ],
    nextScene: 'exploration'
  },
  mark_training: {
    id: 'mark_training',
    location: 'school',
    dialogue: [
      { speaker: 'Narrator', text: 'You find Mark in the school dojo, practicing his swings with intense focus.' },
      { speaker: 'Mark', text: 'Clomp! Want to spar? I need to get stronger if we\'re going to face those demons.' },
      { speaker: 'Clomp', text: 'Sure. But Mark... are you okay? After what happened in the basement...' },
      { speaker: 'Mark', text: 'I\'m fine. Better than fine. For the first time in my life, I feel like I have a purpose.' },
      { speaker: 'Mark', text: 'My dad was a kendo champion. He always told me: "A warrior\'s strength isn\'t in his sword. It\'s in what he protects."' },
      { speaker: 'Mark', text: 'Now I know what I\'m protecting. All of you. This town. The whole world, if it comes to that.' },
      { speaker: 'Clomp', text: 'Mark... you\'ve grown a lot since we started this.' },
      { speaker: 'Mark', text: 'Heh. Ifrit\'s flames burn bright in me now. I can feel it. Let me show you!' },
      { speaker: 'Narrator', text: 'Mark\'s Persona flares to life behind him — Ifrit, the fire demon, its fists blazing with infernal heat.' },
      { speaker: 'Mark', text: 'With this power, I\'ll be strong enough to protect everyone. I promise!' },
      { speaker: 'Narrator', text: 'Mark\'s determination is inspiring. His bond with Ifrit grows stronger with each battle.' },
    ],
    nextScene: 'exploration'
  },
  brown_truth: {
    id: 'brown_truth',
    location: 'shrine',
    dialogue: [
      { speaker: 'Narrator', text: 'Brown stands before the shrine, his expression unusually serious.' },
      { speaker: 'Brown', text: 'Clomp. There\'s something I need to tell you. About why I really came here.' },
      { speaker: 'Clomp', text: 'I\'m listening.' },
      { speaker: 'Brown', text: 'I\'m not just a guardian. I\'m... from the demon realm too. Like you.' },
      { speaker: 'Clomp', text: 'What?!' },
      { speaker: 'Brown', text: 'Not a half-blood like you. I\'m a full demon who chose to live in the human world. Thor chose me because I wanted to protect humans.' },
      { speaker: 'Brown', text: 'I was sent to watch over you. Your mother... she was my queen. She asked me to make sure you were safe.' },
      { speaker: 'Clomp', text: 'You knew my mother?' },
      { speaker: 'Brown', text: 'I loved her. She was the kindest demon who ever lived. She gave up everything for love.' },
      { speaker: 'Brown', text: 'When Aciel began his plans, she sent you to the human world with your father. I followed to protect you.' },
      { speaker: 'Clomp', text: 'Brown... I... I don\'t know what to say.' },
      { speaker: 'Brown', text: 'You don\'t need to say anything. Just know that you\'re not alone. You never were.' },
      { speaker: 'Narrator', text: 'For the first time, you see tears in Brown\'s eyes. The thunder god Thor rumbles softly in the sky above.' },
    ],
    nextScene: 'exploration'
  },
  mysterious_merchant: {
    id: 'mysterious_merchant',
    location: 'shoppingDistrict',
    dialogue: [
      { speaker: 'Narrator', text: 'The strange shop has changed. New items glow on the shelves.' },
      { speaker: 'Shopkeeper', text: 'Ah, you\'ve returned! The veil grows thinner, and so do the opportunities.' },
      { speaker: 'Shopkeeper', text: 'I have something special for you today. A gift from the Velvet Room.' },
      { speaker: 'Narrator', text: 'The shopkeeper hands you a collection of items — potions, stones, and a mysterious amulet.' },
      { speaker: 'Shopkeeper', text: 'The amulet will protect its wearer from dark magic. Use it wisely.' },
      { speaker: 'Shopkeeper', text: 'And Clomp... your mother would be proud of the person you\'ve become.' },
      { speaker: 'Clomp', text: 'You knew my mother?!' },
      { speaker: 'Shopkeeper', text: 'Heh heh... the Velvet Room knows all. Now go. Destiny awaits!' },
      { speaker: 'Narrator', text: 'You received valuable items! Your party is better equipped for the challenges ahead.' },
    ],
    nextScene: 'exploration'
  },
  hospital_patients: {
    id: 'hospital_patients',
    location: 'hospital',
    dialogue: [
      { speaker: 'Narrator', text: 'You visit the coma ward. The patients lie still, their faces peaceful now after your earlier purification.' },
      { speaker: 'Lisa', text: 'These people... their dreams were being invaded. The demons were using their subconscious as a gateway.' },
      { speaker: 'Brown', text: 'Each coma victim weakens the barrier. The demons feed on the psychic energy released when the mind is vulnerable.' },
      { speaker: 'Clomp', text: 'We need to stop this at the source. More people will fall if we don\'t.' },
      { speaker: 'Narrator', text: 'A nurse approaches you cautiously.' },
      { speaker: 'Nurse', text: 'You\'re the young people who were here before? The patients... they\'ve been improving since you came. The doctors can\'t explain it.' },
      { speaker: 'Clomp', text: 'We\'re glad they\'re getting better. We\'ll do everything we can to help.' },
      { speaker: 'Nurse', text: 'Bless you, dear. There\'s something strange about you though... your hair. It seems to glow when you\'re near the patients.' },
      { speaker: 'Narrator', text: 'She\'s right. Your blue hair pulses gently near the comatose, as if trying to heal them with its light.' },
      { speaker: 'Lisa', text: 'Clomp\'s demonic heritage gives him power over the boundary between consciousness and dreams.' },
      { speaker: 'Brown', text: 'That\'s why Aciel fears you. You can close the very gates he\'s trying to open.' },
    ],
    nextScene: 'exploration'
  },
  cherry_blossom: {
    id: 'cherry_blossom',
    location: 'park',
    dialogue: [
      { speaker: 'Narrator', text: 'The cherry blossom tree in the park is in full bloom, even though it\'s not the season. Its petals glow faintly blue.' },
      { speaker: 'Lisa', text: 'This tree... it wasn\'t like this before. The petals are blue, like Clomp\'s hair.' },
      { speaker: 'Clomp', text: 'I can feel something from it. This tree is an anchor point for the barrier too.' },
      { speaker: 'Narrator', text: 'As you touch the trunk, visions flash through your mind — the history of Mikage-cho, the first Persona users, the ancient pact between humans and demons.' },
      { speaker: 'Vision', text: 'Long ago, when the barrier was first created, a demon queen and a human priestess stood beneath this very tree.' },
      { speaker: 'Vision', text: 'They made a pact: as long as their descendants lived, the barrier would hold. Love would be the foundation of peace between worlds.' },
      { speaker: 'Clomp', text: 'My mother... she was part of that lineage. That\'s why the tree responds to me.' },
      { speaker: 'Brown', text: 'The cherry blossom is the symbol of the pact. Its blue petals mean the barrier recognizes you as its guardian.' },
      { speaker: 'Narrator', text: 'A shower of blue petals falls around you, and you feel power flowing into your party. The barrier grows stronger.' },
      { speaker: 'Narrator', text: 'All party members recovered HP and SP!' },
    ],
    nextScene: 'exploration'
  },
  night_patrol: {
    id: 'night_patrol',
    location: 'street',
    dialogue: [
      { speaker: 'Narrator', text: 'Night falls over Mikage-cho. The streets are empty, but shadows dance in every corner.' },
      { speaker: 'Mark', text: 'Let\'s patrol the streets. If demons are active at night, we should intercept them.' },
      { speaker: 'Clomp', text: 'Good idea. My senses are sharper at night. I can feel where the barriers are weakest.' },
      { speaker: 'Narrator', text: 'As you walk through the darkened streets, your blue hair acts like a beacon, cutting through the supernatural darkness.' },
      { speaker: 'Lisa', text: 'Clomp, your hair is amazing at night. It\'s like carrying a lantern made of starlight.' },
      { speaker: 'Clomp', text: 'Heh... thanks Lisa. At least something good comes from having hair that reaches the ground.' },
      { speaker: 'Brown', text: 'There — ahead. A cluster of shadows near the alley.' },
      { speaker: 'Narrator', text: 'Dark shapes coalesce in the alleyway. Demons, drawn to the thin barrier in this area.' },
      { speaker: 'Mark', text: 'Let\'s clean them out!' },
    ],
    combat: 'random_shadows',
    nextScene: 'after_patrol'
  },
  after_patrol: {
    id: 'after_patrol',
    location: 'street',
    dialogue: [
      { speaker: 'Narrator', text: 'The shadows dissolve. The barrier in this area strengthens visibly.' },
      { speaker: 'Clomp', text: 'Every demon we defeat makes the barrier a little stronger. We\'re making a difference.' },
      { speaker: 'Brown', text: 'Keep this up, and we might be able to stabilize Mikage-cho completely.' },
      { speaker: 'Lisa', text: 'Then let\'s keep going. For everyone in this town.' },
      { speaker: 'Narrator', text: 'The night air feels cleaner now. The shadows retreat from your party\'s combined light.' },
    ],
    nextScene: 'exploration'
  },
  school_memories: {
    id: 'school_memories',
    location: 'school',
    dialogue: [
      { speaker: 'Narrator', text: 'The school is quiet in the evening. Golden light streams through the windows.' },
      { speaker: 'Lisa', text: 'Remember when we first met, Clomp? You were sitting alone under the cherry tree on the first day.' },
      { speaker: 'Clomp', text: 'Yeah... kids used to make fun of my hair. They called me "the blue weirdo."' },
      { speaker: 'Lisa', text: 'And I sat down next to you and said, "I think your hair is cool." And you looked so surprised!' },
      { speaker: 'Clomp', text: 'I\'d never had anyone say something nice about it before. You changed my life that day, Lisa.' },
      { speaker: 'Lisa', text: 'We\'ve been inseparable ever since. And now... we\'re saving the world together.' },
      { speaker: 'Mark', text: 'Hey, don\'t forget about me! I was the one who taught Clomp to tie his hair back so he wouldn\'t trip!' },
      { speaker: 'Clomp', text: 'Ha! That\'s true. Though I still can\'t get it all tied up properly.' },
      { speaker: 'Brown', text: 'These bonds between you... they\'re what give your Personas strength. Never forget that.' },
      { speaker: 'Narrator', text: 'The school halls echo with laughter and memories. In this place of learning, you\'ve learned the most important lesson of all: the power of friendship.' },
    ],
    nextScene: 'exploration'
  },
  demon_encounter_peaceful: {
    id: 'demon_encounter_peaceful',
    location: 'demonWorld',
    dialogue: [
      { speaker: 'Narrator', text: 'In the demon realm, you encounter a small demon sitting alone on a floating rock. It doesn\'t attack.' },
      { speaker: 'Small Demon', text: '...You\'re the half-blood, aren\'t you? The queen\'s child.' },
      { speaker: 'Clomp', text: 'You know my mother?' },
      { speaker: 'Small Demon', text: 'Everyone in the demon realm knew your mother. She was the only demon who ever cried for a human.' },
      { speaker: 'Small Demon', text: 'She used to sing to us. Her voice was like... like the space between stars. Beautiful and sad.' },
      { speaker: 'Lisa', text: 'She sounds wonderful.' },
      { speaker: 'Small Demon', text: 'She was. That\'s why Aciel hates her legacy. Love between demons and humans... it threatens everything he believes in.' },
      { speaker: 'Small Demon', text: 'Go, half-blood. Finish what your mother started. Make both worlds safe... so that love like hers can exist without fear.' },
      { speaker: 'Clomp', text: 'I will. I promise.' },
      { speaker: 'Narrator', text: 'The small demon fades away, leaving behind a faint warmth. Even in the demon realm, your mother\'s love left its mark.' },
    ],
    nextScene: 'exploration'
  },
  final_prep: {
    id: 'final_prep',
    location: 'shrine',
    dialogue: [
      { speaker: 'Narrator', text: 'Before entering the final battle, your party gathers at the shrine for one last preparation.' },
      { speaker: 'Brown', text: 'This is it. Beyond the gate lies Erebus — the primordial darkness itself.' },
      { speaker: 'Mark', text: 'I\'m not scared. With all of you beside me, I could face anything.' },
      { speaker: 'Lisa', text: 'Me neither. We\'ve come this far together. We\'ll finish it together.' },
      { speaker: 'Clomp', text: 'Everyone... thank you. For accepting me. For fighting beside me. For being my friends.' },
      { speaker: 'Clomp', text: 'Whatever happens in there... no matter what I am... being your friend is the best thing that ever happened to me.' },
      { speaker: 'Lisa', text: 'Clomp...' },
      { speaker: 'Mark', text: 'Don\'t get sentimental on us now, hair-dragger!' },
      { speaker: 'Brown', text: 'He\'s right though. These bonds are our greatest weapon. Let\'s go.' },
      { speaker: 'Narrator', text: 'Four Personas blaze to life — Orpheus, Jack Frost, Ifrit, and Thor — their combined light pushing back the darkness.' },
      { speaker: 'Narrator', text: 'Together, you step through the gate toward the final confrontation.' },
    ],
    nextScene: 'exploration'
  },

  // === MORE SIDE CONTENT ===
  hallway_shadow: {
    id: 'hallway_shadow',
    location: 'hallway',
    dialogue: [
      { speaker: 'Narrator', text: 'The apartment hallway feels different now. With your awakened senses, you can see the threads of demonic energy woven through the walls.' },
      { speaker: 'Clomp', text: 'The shadows here... they\'re watching us. But they\'re afraid too.' },
      { speaker: 'Lisa', text: 'Afraid? Of what?' },
      { speaker: 'Clomp', text: 'Of me. My Persona\'s light... it hurts them. They know I can close the gates they come through.' },
      { speaker: 'Narrator', text: 'A small shadow creature peeks out from behind a potted plant. It trembles as Clomp\'s blue hair glows.' },
      { speaker: 'Shadow', text: 'P-please... don\'t hurt us... We were just... lost...' },
      { speaker: 'Clomp', text: 'You... can talk?' },
      { speaker: 'Shadow', text: 'Not all demons are evil... Some of us just... fell through the cracks. We want to go home...' },
      { speaker: 'Brown', text: 'Clomp... some demons aren\'t invaders. They\'re refugees, like you.' },
      { speaker: 'Clomp', text: 'I... I understand. Go. I won\'t hurt you. But stay away from humans. It\'s not safe for you here.' },
      { speaker: 'Shadow', text: 'Thank you... half-blood... You are kind, like the queen was...' },
      { speaker: 'Narrator', text: 'The shadow fades away peacefully. Not all encounters with demons need to end in violence.' },
    ],
    nextScene: 'exploration'
  },
  park_reflection: {
    id: 'park_reflection',
    location: 'park',
    dialogue: [
      { speaker: 'Narrator', text: 'You sit by the fountain and look at your reflection in the water. Your blue hair floats on the surface like liquid sapphire.' },
      { speaker: 'Clomp', text: 'Who am I, really? A demon\'s child raised by humans... A bridge between two worlds that want to destroy each other...' },
      { speaker: 'Orpheus', text: 'You are Clomp. That is enough. Identity is not where you come from — it is what you choose to become.' },
      { speaker: 'Clomp', text: 'But what if I\'m wrong? What if Aciel is right? What if I belong with the demons?' },
      { speaker: 'Orpheus', text: 'Your mother chose the human world. She chose love over power. That choice lives in you.' },
      { speaker: 'Orpheus', text: 'Look at your friends. Look at the life you\'ve built. This is who you are.' },
      { speaker: 'Clomp', text: '...You\'re right. I choose this world. I choose my friends. I choose to be Clomp.' },
      { speaker: 'Narrator', text: 'The fountain\'s water glows brighter, as if affirming your choice. Your resolve strengthens.' },
      { speaker: 'Narrator', text: 'Clomp\'s magic increased! The bond with Orpheus deepens.' },
    ],
    nextScene: 'exploration'
  },
  school_rooftop: {
    id: 'school_rooftop',
    location: 'school',
    dialogue: [
      { speaker: 'Narrator', text: 'You climb to the school rooftop. The view of Mikage-cho stretches out before you — peaceful, unaware of the danger lurking beneath.' },
      { speaker: 'Mark', text: 'From up here, you can\'t see the shadows. It\'s almost normal.' },
      { speaker: 'Lisa', text: 'That\'s what we\'re fighting for. So it stays normal.' },
      { speaker: 'Brown', text: 'The barrier is visible from here, if you know how to look. It\'s like a dome of light over the entire town.' },
      { speaker: 'Clomp', text: 'I can see it... it\'s beautiful. And I can see where it\'s cracking too.' },
      { speaker: 'Narrator', text: 'Sure enough, hairline fractures in the invisible barrier are visible to Clomp\'s enhanced sight. Dark energy seeps through the gaps.' },
      { speaker: 'Brown', text: 'Every demon we defeat, every crystal we recover, seals those cracks. We\'re literally holding the world together.' },
      { speaker: 'Mark', text: 'Then let\'s keep at it. For every person down there who doesn\'t even know they\'re in danger.' },
      { speaker: 'Narrator', text: 'The wind blows across the rooftop, carrying cherry blossom petals. For a moment, everything is at peace.' },
    ],
    nextScene: 'exploration'
  },
  demon_world_mother: {
    id: 'demon_world_mother',
    location: 'demonWorld',
    dialogue: [
      { speaker: 'Narrator', text: 'Deep in the demon realm, you find a garden of crystal flowers — your mother\'s former palace, now abandoned.' },
      { speaker: 'Clomp', text: 'This is... this was my mother\'s home. I can feel her presence here, faint but real.' },
      { speaker: 'Narrator', text: 'Among the crystal flowers, you find a portrait — a beautiful demon woman with flowing blue hair, holding a human baby.' },
      { speaker: 'Lisa', text: 'Clomp... she looks just like you. The hair, the eyes...' },
      { speaker: 'Clomp', text: 'She gave up everything. Her throne, her people, her world... for love. For me.' },
      { speaker: 'Brown', text: 'Your mother was the Demon Queen Seraphina. She was the most powerful being in this realm, and the kindest.' },
      { speaker: 'Clomp', text: 'I\'ll finish what she started. I\'ll protect both worlds — the human world she loved and the demon world she came from.' },
      { speaker: 'Narrator', text: 'As you touch the portrait, a warm light envelops you. Your mother\'s blessing flows through your blood.' },
      { speaker: 'Narrator', text: 'Clomp learned a new skill: Azure Burst! The power of his mother\'s love manifests as devastating blue flames.' },
    ],
    nextScene: 'exploration'
  },
  street_encounter: {
    id: 'street_encounter',
    location: 'street',
    dialogue: [
      { speaker: 'Narrator', text: 'Walking through the streets, you notice a group of children playing near the park entrance. They seem oblivious to the supernatural danger.' },
      { speaker: 'Child', text: 'Hey mister! Your hair is so cool! Is it really blue? Can I touch it?' },
      { speaker: 'Clomp', text: 'Ha... sure, kid. Go ahead.' },
      { speaker: 'Narrator', text: 'The child tugs at your long blue hair with wonder. It shimmers in the sunlight like a waterfall of sapphires.' },
      { speaker: 'Child', text: 'It\'s so soft! Like water! Are you a mermaid?' },
      { speaker: 'Clomp', text: 'Something like that.' },
      { speaker: 'Lisa', text: 'These kids have no idea what\'s happening. That\'s exactly why we fight.' },
      { speaker: 'Mark', text: 'So they can keep playing, keep laughing, keep being kids.' },
      { speaker: 'Brown', text: 'That\'s what the barrier protects. Not just walls between worlds — but the innocence of those who live within it.' },
      { speaker: 'Narrator', text: 'The children run off to play, laughing. Their joy is a reminder of everything worth protecting.' },
    ],
    nextScene: 'exploration'
  },
  // === ADDITIONAL MAIN STORY TRANSITIONS ===
  chapter1_transition: {
    id: 'chapter1_transition',
    location: 'street',
    dialogue: [
      { speaker: 'Narrator', text: 'Days pass. The party grows stronger with each battle. Clomp\'s blue hair seems to glow brighter as his power grows.' },
      { speaker: 'Narrator', text: 'The incidents in Mikage-cho continue. More people fall into comas. The barrier weakens with each passing day.' },
      { speaker: 'Brown', text: 'We need to find the remaining crystals soon. The barrier won\'t hold much longer.' },
      { speaker: 'Clomp', text: 'I can feel it getting thinner. Every night, the shadows grow bolder.' },
      { speaker: 'Lisa', text: 'Then we push forward. Together.' },
      { speaker: 'Mark', text: 'Let\'s check the park. Brown said the next crystal might be there.' },
    ],
    nextScene: 'exploration'
  },
  chapter2_transition: {
    id: 'chapter2_transition',
    location: 'park',
    dialogue: [
      { speaker: 'Narrator', text: 'With the first crystal secured, the party ventures deeper into the mystery. The shrine in the forest holds the next clue.' },
      { speaker: 'Narrator', text: 'But the path is dangerous. Demons patrol the forest in greater numbers, drawn to the weakening barrier.' },
      { speaker: 'Brown', text: 'The shrine was built by the first Persona users — humans and demons who fought together to create the barrier.' },
      { speaker: 'Clomp', text: 'Humans and demons... working together. That\'s what my mother believed in.' },
      { speaker: 'Brown', text: 'Your mother was extraordinary, Clomp. She proved that the two worlds could coexist.' },
      { speaker: 'Lisa', text: 'Let\'s honor her legacy. Let\'s save both worlds.' },
    ],
    nextScene: 'exploration'
  },
  chapter3_transition: {
    id: 'chapter3_transition',
    location: 'shrine',
    dialogue: [
      { speaker: 'Narrator', text: 'Two crystals recovered. The barrier stabilizes, but the final crystal lies in the demon realm itself.' },
      { speaker: 'Narrator', text: 'The party rests at the shrine, preparing for the journey ahead.' },
      { speaker: 'Mark', text: 'The demon realm... I\'ve never been anywhere like it. Are we ready?' },
      { speaker: 'Brown', text: 'We\'ll never be fully ready. But we have each other, and we have our Personas. That\'s enough.' },
      { speaker: 'Clomp', text: 'I was born in that realm. Part of me belongs there. I\'ll guide us through.' },
      { speaker: 'Lisa', text: 'And we\'ll be right beside you. Always.' },
      { speaker: 'Narrator', text: 'The torii gate glows with power. Beyond it lies the demon realm — and the truth about Clomp\'s origins.' },
    ],
    nextScene: 'exploration'
  },
  chapter4_transition: {
    id: 'chapter4_transition',
    location: 'demonWorld',
    dialogue: [
      { speaker: 'Narrator', text: 'Aciel is defeated, but its dying words echo in the air. Erebus — the primordial darkness — is awakening.' },
      { speaker: 'Narrator', text: 'The demon realm shakes. Reality itself begins to fray at the edges.' },
      { speaker: 'Brown', text: 'Erebus existed before the barrier, before the worlds were separated. It IS the darkness between all things.' },
      { speaker: 'Clomp', text: 'If it fully awakens, it won\'t just destroy the barrier — it will unmake reality itself.' },
      { speaker: 'Mark', text: 'Then we stop it. No matter what.' },
      { speaker: 'Lisa', text: 'Together. Like always.' },
      { speaker: 'Brown', text: 'The Void Between Worlds is the only place Erebus can be confronted. It exists outside both realms.' },
      { speaker: 'Clomp', text: 'Then that\'s where we go. To the space between everything. Let\'s end this.' },
    ],
    nextScene: 'exploration'
  },

  hospital_doctor: {
    id: 'hospital_doctor',
    location: 'hospital',
    dialogue: [
      { speaker: 'Narrator', text: 'A doctor approaches you in the hospital corridor. He looks exhausted but grateful.' },
      { speaker: 'Doctor', text: 'You\'re the young people who helped before? I need to thank you. Since your visit, seven patients have woken up.' },
      { speaker: 'Clomp', text: 'We\'re glad. Is there anything else we can do?' },
      { speaker: 'Doctor', text: 'There\'s one patient... a young girl. She hasn\'t responded to anything. But when we brought her near that blue-haired boy...' },
      { speaker: 'Narrator', text: 'He looks at Clomp\'s flowing blue hair with a mixture of confusion and hope.' },
      { speaker: 'Doctor', text: 'Her vital signs improved. Something about your presence seems to help. Can you try?' },
      { speaker: 'Narrator', text: 'You visit the girl\'s room. She\'s young, maybe eight years old. Her face is peaceful but pale.' },
      { speaker: 'Clomp', text: 'I can feel it... a demon has hold of her dream. It\'s deep — deeper than the others.' },
      { speaker: 'Narrator', text: 'You channel Orpheus\'s power. Blue light flows from your hair into the girl. Slowly, color returns to her cheeks.' },
      { speaker: 'Narrator', text: 'Her eyes flutter open. She looks at Clomp and smiles.' },
      { speaker: 'Girl', text: 'The blue angel... he came to save me... just like in my dream...' },
      { speaker: 'Clomp', text: '...Yeah. I came to save you. You\'re safe now.' },
      { speaker: 'Narrator', text: 'The doctor wipes tears from his eyes. Another life saved by the boy with hair blue as the sky.' },
    ],
    nextScene: 'exploration'
  },
};

// ============ COMBAT ENCOUNTERS ============
export const COMBAT_ENCOUNTERS: Record<string, { enemies: string[]; background: string }> = {
  basement_battle: {
    enemies: ['demon'],
    background: 'basement'
  },
  park_battle: {
    enemies: ['wraith', 'shadow', 'shadow'],
    background: 'park'
  },
  shrine_battle: {
    enemies: ['bossKnight'],
    background: 'shrine'
  },
  boss_aciel: {
    enemies: ['bossDevil'],
    background: 'demonworld'
  },
  boss_erebus: {
    enemies: ['bossGoddess'],
    background: 'void'
  },
  hospital_battle: {
    enemies: ['ghost', 'wraith'],
    background: 'hospital'
  },
  random_shadows: {
    enemies: ['shadow', 'shadow'],
    background: 'street'
  },
  random_demons: {
    enemies: ['demon', 'shadow'],
    background: 'shrine'
  },
  random_knights: {
    enemies: ['knight', 'harpy'],
    background: 'demonworld'
  },
  random_harpy: {
    enemies: ['harpy', 'harpy'],
    background: 'demonworld'
  },
  random_wraiths: {
    enemies: ['wraith', 'wraith', 'shadow'],
    background: 'basement'
  },
  random_mixed: {
    enemies: ['demon', 'ghost', 'shadow'],
    background: 'park'
  }
};

// ============ RANDOM ENCOUNTER TABLES BY LOCATION ============
export const RANDOM_ENCOUNTERS: Record<string, string[]> = {
  schoolBasement: ['random_shadows', 'random_wraiths'],
  park: ['random_shadows', 'random_demons', 'random_mixed'],
  shrine: ['random_demons', 'random_knights', 'random_wraiths'],
  demonWorld: ['random_knights', 'random_demons', 'random_harpy'],
  finalArea: ['random_knights', 'random_harpy'],
  hospital: ['random_shadows', 'random_wraiths'],
  street: ['random_shadows'],
};
