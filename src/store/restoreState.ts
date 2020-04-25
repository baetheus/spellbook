import { tryCatch, chain, mapLeft, right, left, fold } from "fp-ts/es6/Either";
import { pipe } from "fp-ts/es6/pipeable";
import { formatValidationError } from "io-ts-reporters";
import { isSome } from "fp-ts/es6/Option";
import { RunOnce } from "@nll/dux/Store";
import { TypedAction, ActionCreator } from "@nll/dux/Actions";
import { of } from "rxjs";
import { map } from "rxjs/operators";

import { STORAGE_KEY } from "./consts";
import { StateCodec } from "./validators";
import { recoverState, errorRecoveringState } from "./store";
import { notNil } from "~/libraries/fns";

import { State } from "./models";

export const trySetState = (s: StateCodec) =>
  tryCatch(
    () => window.localStorage.setItem(STORAGE_KEY, JSON.stringify(StateCodec.encode(s))),
    () => "Failed to set state in localStorage"
  );

const tryGetState = () =>
  tryCatch(
    () => window.localStorage.getItem(STORAGE_KEY),
    (_) => "Failed to get state from localStorage"
  );

const tryCheckNull = (s: string | null) => (notNil(s) ? right(s) : left(`Returned state was ${s}`));

const tryParse = (s: string) =>
  tryCatch(
    (): unknown => JSON.parse(s),
    (_) => "Failed to parse json"
  );

const tryDecode = (s: unknown) =>
  pipe(
    StateCodec.decode(s),
    // Format Error
    mapLeft((e) =>
      e
        .map(formatValidationError)
        .filter(isSome)
        .map((n) => n.value)
        .join("\n\n")
    )
  );

const asAnyAction = <P>(ac: ActionCreator<P, any>): ((p: P) => TypedAction) => (p: P) => ac(p);

export const restoreState: RunOnce<State> = () =>
  of(pipe(tryGetState(), chain(tryCheckNull), chain(tryParse), chain(tryDecode))).pipe(
    map(fold(asAnyAction(errorRecoveringState), asAnyAction(recoverState)))
  );
