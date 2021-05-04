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
