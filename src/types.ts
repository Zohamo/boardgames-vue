export interface Game {
  id: number;
  bggId?: number;
  slug: string;
  preTitle?: string;
  title: string;
  postTitle?: string;
  designers?: string[];
  year: number;
  players: Range;
  age?: Range;
  bggWeight: number;
  bggRatings?: number;
  duration: Range;
  type?: string;
  theme: string;
  categories?: string[];
  mechanisms?: string[];
}

export interface Picture {
  caption?: string;
  src: string;
  alt?: string;
}

export interface Play {
  id: number;
  date: string;
  players: any[];
}

export interface Player {
  id: number;
  name: string;
}

export interface Range {
  min: number;
  max?: number;
}

/**
 * Scythe
 */

export enum ScytheAutomaLevel {
  Autometta,
  Automa,
  Automaszyna,
  Ultimaszyna,
}

export enum ScytheFactionSlug {
  Polania = "POL",
  Nordic = "NOR",
  Rusviet = "RUS",
  Crimea = "CRI",
  Saxony = "SAX",
  Togawa = "TOG",
  Albion = "ALB",
}

export interface ScytheFaction {
  slug: string | ScytheFactionSlug;
  name: string;
  color: string;
}

export interface ScythePlay {
  id: number;
  date: string;
  human: ScythePlayer;
  automa: ScythePlayer;
  modules?: {
    airship?: {
      aggressive: string;
      passive: string;
    };
    resolution?: string;
  };
}

export interface ScythePlayer {
  id?: number;
  name?: string;
  faction: string | ScytheFactionSlug;
  playerMatId?: string;
  automaLevel?: ScytheAutomaLevel;
  winner?: boolean;
  score: number;
  stars?: number;
  popularity?: number;
  buildings?: number;
}

/**
 * Tapestry
 */

export enum TapestryAutomaLevel {
  Autometta,
  Automa,
  Automaszyna,
  Ultimaszyna,
}

export enum TapestryCivilizationSlug {
  Alchemists = "ALCHEMISTS",
  Architects = "ARCHITECTS",
  Chosen = "CHOSEN",
  Craftsmen = "CRAFTSMEN",
  Entertainers = "ENTERTAINERS",
  Futurists = "FUTURISTS",
  Heralds = "HERALDS",
  Historians = "HISTORIANS",
  Inventors = "INVENTORS",
  Isolationists = "ISOLATIONISTS",
  Leaders = "LEADERS",
  Merrymakers = "MERRYMAKERS",
  Militants = "MILITANTS",
  Mystics = "MYSTICS",
  Nomads = "NOMADS",
  Traders = "TRADERS",
  // Plans & Ploys
  Advisors = "ADVISORS",
  Aliens = "ALIENS",
  Infiltrators = "INFILTRATORS",
  Islanders = "ISLANDERS",
  Recyclers = "RECYCLERS",
  Riverfolk = "RIVERFOLK",
  Spies = "SPIES",
  Tinkerers = "TINKERERS",
  TreasureHunters = "TREASURE HUNTERS",
  Utilitarians = "UTILITARIANS",
  // Automa
  Conquerors = "CONQUERORS",
  Engineers = "ENGINEERS",
  Explorers = "EXPLORERS",
  Scientists = "SCIENTISTS",
  // Automa : Plans & Ploys
  Hawkers = "HAWKERS",
  Iconoclasts = "ICONOCLASTS",
  Levelers = "LEVELERS",
  Pioneers = "PIONEERS",
}

export interface TapestryCapital {
  id: number;
  name: string;
}

export interface TapestryCivilization {
  id?: number;
  slug: string | TapestryCivilizationSlug;
  name: string;
  notWithAutoma: boolean;
  automa?: boolean;
}

export interface TapestryPlay extends Play {
  players: TapestryPlayer[];
  scenario?: TapestryScenario;
}

export interface TapestryPlayer extends Player {
  automa?: boolean;
  automaLevel?: TapestryAutomaLevel;
  civilization: TapestryCivilization;
  winner?: boolean;
  score: number;
  capitalId?: number;
  monumentsCount?: number;
  technologiesCount?: number;
  territoriesCount?: number;
  tracks?: {
    exploration?: number;
    military?: number;
    science?: number;
    technology?: number;
  };
  bonusTracks?: {
    endTrack?: number;
    outposts?: number;
    centralIsland?: number;
  };
}

export interface TapestryScenario {
  id: number;
  name: string;
}
