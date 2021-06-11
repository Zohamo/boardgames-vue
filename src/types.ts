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

export interface ScytheGame {
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
