import { isRight, tryCatch, chain, filterOrElse, mapLeft } from "fp-ts/lib/Either";
import { pipe } from "fp-ts/lib/pipeable";
import { formatValidationError } from "io-ts-reporters";
import { isSome } from "fp-ts/lib/Option";
import { RunOnce } from "@nll/dux/Store";
import { of, NEVER } from "rxjs";
import { mergeMap } from "rxjs/operators";

import { recoverState, StateCodec, STORAGE_KEY } from "~/store";
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

export const restoreState: RunOnce<State> = () =>
  of(
    pipe(
      tryGetState(),
      filterOrElse(notNil, (e) => `State returned by localStorage is ${e}`),
      chain(tryParse),
      chain(tryDecode)
    )
  ).pipe(
    mergeMap((e) => {
      if (isRight(e)) {
        console.log("Recovering State", e.right);
        return of(recoverState(e.right));
      }
      console.warn(e.left);
      return NEVER;
    })
  );
