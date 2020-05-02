import { DatumEither } from "@nll/datum/DatumEither";

export type CreatureSource =
  | "Monster Manual"
  | "Players Handbook"
  | "Dungeon Masters Guide"
  | "Explorers Guide to Wildemount"
  | "Custom";

export interface Creature {
  name: string;
  type: string;
  rating: number;
  experience: number;
  ac: number;
  armor?: string;
  hp: number;
  speed: string;
  str: number;
  dex: number;
  con: number;
  int: number;
  wis: number;
  cha: number;
  features: string;
  traits: string;
  actions?: string;
  reactions?: string;
  source: CreatureSource;
  page?: number;
}

export type Creatures = Creature[];

/**
 * State
 */
export type State = {
  creatures: DatumEither<Error, Creatures>;
  selected: Set<string>;
  search: string;
};
