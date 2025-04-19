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
  mechanisms?: Mechanism[];
}

export interface Mechanism {
  id: number;
  name: string;
}

export interface Picture {
  caption?: string;
  src: string;
  alt?: string;
}

export interface Play {
  id: number;
  date: string;
  time?: number;
  players: Player[];
}

export interface Player {
  id?: number;
  name?: string;
}

export interface Range {
  min: number;
  max?: number;
}

/**
 * Magic the Gathering
 */

export interface MtgAbility {
  nameFr: string;
  nameEn: string;
  ref: string;
  description: string;
  details: { ref: string; textFr: string }[];
}

export interface MtgSet {
  code: string;
  name: string;
  type: string;
  booster: (string | string[])[];
  releaseDate: string;
  block: string;
  onlineOnly: boolean;
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

export interface ScythePlay extends Play {
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

export enum TapestryCampaignSlug {
  Atlantid = "ATLANTID",
  Kaiju = "KAIJU",
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
  TreasureHunters = "TREASURE_HUNTERS",
  Utilitarians = "UTILITARIANS",
  // Fantasies & Futures (FF)
  Artificers = "ARTIFICERS",
  Celestials = "CELESTIALS",
  ElderOnes = "ELDER_ONES",
  Faefolk = "FAEFOLK",
  Genies = "GENIES",
  Illuminati = "ILLUMINATI",
  Merfok = "MERFOLK",
  Psionics = "PSIONICS",
  Weefolk = "WEEFOLK",
  Werefolk = "WEREFOLK",
  // Automa
  Conquerors = "CONQUERORS",
  Engineers = "ENGINEERS",
  Explorers = "EXPLORERS",
  Scientists = "SCIENTISTS",
  // Automa : Plans & Ploys (PP)
  Hawkers = "HAWKERS",
  Iconoclasts = "ICONOCLASTS",
  Levelers = "LEVELERS",
  Pioneers = "PIONEERS",
  // Automa : Fantasies & Futures (FF)
  Charmers = "CHARMERS",
  Erratics = "ERRATICS",
  TimeTravelers = "TIME_TRAVELERS",
}

export enum TapestryExpansionSlug {
  PP = "PP",
  AA = "AA",
  FF = "FF",
}

class TapestryExpansible {
  expansionSlug?: string | TapestryExpansionSlug;
  expansion?: TapestryExpansion;
}

export interface TapestryAutoma {
  id: number;
  name: string;
}

export interface TapestryCampaign extends TapestryExpansible {
  slug: string | TapestryCampaignSlug;
  name: string;
}

export interface TapestryCapital extends TapestryExpansible {
  id: number;
  name: string;
}

export interface TapestryCivilization extends TapestryExpansible {
  slug: string | TapestryCivilizationSlug;
  name: string;
  notWithAutoma?: boolean;
  automa?: boolean;
}

export interface TapestryExpansion {
  slug: string | TapestryExpansionSlug;
  name: string;
}

export interface TapestryPlay extends Play {
  players: TapestryPlayer[];
  campaignSlug?: string | TapestryCampaignSlug;
  scenarioId?: number;
  scenario?: TapestryScenario;
}

export interface TapestryPlayer extends Player {
  automa?: boolean;
  automaLevel?: number;
  civilizationSlug?: string;
  civilization?: TapestryCivilization;
  winner?: boolean;
  score?: number;
  capitalId?: number;
  capital?: TapestryCapital;
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

export interface TapestryScenario extends TapestryExpansible {
  id: number;
  campaignSlug?: string | TapestryCampaignSlug;
  campaign?: TapestryCampaign;
  number: number;
  name: string;
}
