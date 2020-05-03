import { DatumEither } from "@nll/datum/DatumEither";
import { CreaturesWithIds } from "./consts";

/**
 * State
 */
export type State = {
  creatures: DatumEither<Error, CreaturesWithIds>;
  selected: Set<string>;
  search: string;
};
