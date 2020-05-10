import { initial } from "@nll/datum/DatumEither";
import { Lens } from "monocle-ts";
import * as C from "io-ts/es6/Codec";

import { State } from "./models";
import { setFromStringArray } from "~/libraries/sets";

export const creatureIdLens = Lens.fromProp<Creature>()("id");

export const CreatureSource = C.literal(
  "Monster Manual",
  "Players Handbook",
  "Dungeon Masters Guide",
  "Explorers Guide to Wildemount",
  "Custom"
);

/** Creature */
export const Creature = C.intersection(
  C.type({
    id: C.string,
    name: C.string,
    type: C.string,
    rating: C.number,
    experience: C.number,
    ac: C.number,
    hp: C.number,
    speed: C.string,
    str: C.number,
    dex: C.number,
    con: C.number,
    int: C.number,
    wis: C.number,
    cha: C.number,
    features: C.string,
    traits: C.string,
    source: CreatureSource,
  }),
  C.partial({
    armor: C.string,
    actions: C.string,
    reactions: C.string,
    page: C.number,
  })
);
export type Creature = C.TypeOf<typeof Creature>;

/** Creatures */
export const Creatures = C.array(Creature);
export type Creatures = C.TypeOf<typeof Creatures>;

/** New Creature */
export const NewCreature = C.intersection(
  C.type({
    ac: C.number,
    cha: C.number,
    con: C.number,
    dex: C.number,
    experience: C.number,
    features: C.string,
    hp: C.number,
    int: C.number,
    name: C.string,
    rating: C.number,
    source: CreatureSource,
    speed: C.string,
    str: C.number,
    traits: C.string,
    type: C.string,
    wis: C.number,
  }),
  C.partial({
    actions: C.string,
    armor: C.string,
    page: C.number,
    reactions: C.string,
  })
);
export type NewCreature = C.TypeOf<typeof NewCreature>;

/**
 * Api Validators
 */
export const CreaturesRes = C.type({
  creatures: Creatures,
});

export const INITIAL_CREATURES_STATE: State = {
  creatures: initial,
  create: initial,
  edits: {},
  selected: new Set(),
  search: "",
};

/**
 * Usable Consts
 */
export const DEFAULT_CREATURE: Creature = {
  id: "NEW",
  name: "Creature",
  type: "Medium humanoid (any race), any alignment",
  features: "**Freature:** User adds a feature.",
  traits: "_TraiC._ User adds a traiC.",
  actions: "**Action.** User adds an action.",
  ac: 10,
  hp: 10,
  speed: "30fC.",
  str: 0,
  dex: 0,
  con: 2,
  int: 0,
  wis: 0,
  cha: 0,
  rating: 0,
  experience: 10,
  source: "Custom",
  page: 0,
};

/**
 * Config
 */
export const NLL_API_URL = process.env.NLL_API_URL ?? "NLL_API_URL_UNSET";

/**
 * Creature State Codec
 */
export const CREATURE_STORAGE_KEY = "CREATURE_STATE";

export const CreatureStateCodec = C.type({
  selected: setFromStringArray,
  search: C.string,
});
export type CreatureStateCodec = C.TypeOf<typeof CreatureStateCodec>;
