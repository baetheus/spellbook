import { DatumEither } from "@nll/datum/DatumEither";
import { Creatures, Creature } from "./consts";

/**
 * State
 */
export type State = {
  creatures: DatumEither<Error, Creatures>;
  create: DatumEither<Error, Creature>;
  edits: Record<string, DatumEither<Error, Creature>>;
  selected: Set<string>;
  search: string;
};
