import * as t from "io-ts";
import { State } from "./models";
import { initial } from "@nll/datum/DatumEither";

/**
 * Validators
 */
export const CreatureSource = t.keyof({
  "Monster Manual": null,
  "Players Handbook": null,
  "Dungeon Masters Guide": null,
  "Explorers Guide to Wildemount": null,
  Custom: null,
});

export const Creature = t.intersection([
  t.type({
    name: t.string,
    type: t.string,
    rating: t.number,
    experience: t.number,
    ac: t.number,
    hp: t.number,
    speed: t.string,
    str: t.number,
    dex: t.number,
    con: t.number,
    int: t.number,
    wis: t.number,
    cha: t.number,
    features: t.string,
    traits: t.string,
    source: CreatureSource,
  }),
  t.partial({
    armor: t.string,
    actions: t.string,
    reactions: t.string,
    page: t.number,
  }),
]);
export type Creature = t.TypeOf<typeof Creature>;

export const CreatureWithId = t.intersection([
  Creature,
  t.type({
    id: t.string,
  }),
]);
export type CreatureWithId = t.TypeOf<typeof CreatureWithId>;

export const Creatures = t.array(Creature);
export type Creatures = t.TypeOf<typeof Creatures>;

export const CreaturesWithIds = t.array(CreatureWithId);
export type CreaturesWithIds = t.TypeOf<typeof CreaturesWithIds>;

/**
 * Api Validators
 */
export const CreaturesRes = t.type({
  creatures: CreaturesWithIds,
});

export const INITIAL_CREATURES_STATE: State = {
  creatures: initial,
  selected: new Set(),
  search: "",
};

/**
 * Config
 */
export const NLL_API_URL = process.env.NLL_API_URL ?? "NLL_API_URL_UNSET";
