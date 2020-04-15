import { isRight, tryCatch, chain, mapLeft, right, left } from "fp-ts/lib/Either";
import { pipe } from "fp-ts/lib/pipeable";
import { formatValidationError } from "io-ts-reporters";
import { isSome } from "fp-ts/lib/Option";
import { RunOnce } from "@nll/dux/Store";
import { of, NEVER, EMPTY } from "rxjs";
import { mergeMap } from "rxjs/operators";

import { STORAGE_KEY } from "./consts";
import { StateCodec } from "./validators";
import { recoverState } from "./store";
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

export const restoreState: RunOnce<State> = () =>
  of(pipe(tryGetState(), chain(tryCheckNull), chain(tryParse), chain(tryDecode))).pipe(
    mergeMap((e) => {
      if (isRight(e)) {
        console.log("Recovering State", e.right);
        return of(recoverState(e.right));
      }
      console.warn(e.left);
      return EMPTY;
    })
  );
