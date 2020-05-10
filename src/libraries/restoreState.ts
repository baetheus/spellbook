import * as C from "io-ts/es6/Codec";
import * as E from "fp-ts/es6/Either";
import { draw } from "io-ts/es6/Tree";
import { pipe } from "fp-ts/es6/pipeable";
import { ActionCreator, TypedAction, actionCreatorFactory } from "@nll/dux/Actions";
import { RunOnce } from "@nll/dux/Store";
import { of, EMPTY } from "rxjs";
import { map, skip, tap, mergeMapTo } from "rxjs/operators";

import { notNil } from "~/libraries/fns";

const creator = actionCreatorFactory("STORE_STATE");

const trySetState = <S>(codec: C.Codec<S>, key: string) => (s: S) =>
  E.tryCatch(
    () => window.localStorage.setItem(key, JSON.stringify(codec.encode(s))),
    () => `Failed to set state at localStorage key ${key}`
  );

const tryGetState = (key: string) =>
  E.tryCatch(
    () => window.localStorage.getItem(key),
    (_) => "Failed to get state from localStorage"
  );

const tryCheckNull = (s: string | null) =>
  notNil(s) ? E.right(s) : E.left(`Returned state was ${s}`);

const tryParse = (s: string) =>
  E.tryCatch(
    (): unknown => JSON.parse(s),
    (_) => "Failed to parse json"
  );

const tryDecode = <S>(codec: C.Codec<S>) => (s: unknown) => pipe(codec.decode(s), E.mapLeft(draw));

const asAnyAction = <P>(ac: ActionCreator<P, any>): ((p: P) => TypedAction) => (p: P) => ac(p);

const restoreFailed = creator.simple<string>("RECOVER_STATE_ERROR", {}, true);

const restoreSuccessFactory = <A>(key: string) => creator.simple<A>(`RECOVER_${key}`);

const restoreStateFactory = <A, B extends A>(
  codec: C.Codec<A>,
  key: string,
  action: ActionCreator<A>
): RunOnce<B> => () =>
  of(
    pipe(tryGetState(key), E.chain(tryCheckNull), E.chain(tryParse), E.chain(tryDecode(codec)))
  ).pipe(map(E.fold(asAnyAction(restoreFailed), asAnyAction(action))));

const saveStateFactory = <A, B extends A>(codec: C.Codec<A>, key: string): RunOnce<B> => (_, s$) =>
  s$.pipe(skip(1), tap(trySetState(codec, key)), mergeMapTo(EMPTY));

/**
 * Creates reducers and actions for encoding/decoding parts of store to localstorage.
 *
 * @example
 * import { createStore } from '@nll/dux/Store';
 * import { caseFn } from '@nll/dux/Reducers';
 * import * as C from 'io-ts/es6/Codec'
 *
 * type State = { count: number };
 * const StateCodec = C.type({ count: C.number });
 *
 * const store = createStore({ count: 0 });
 *
 * const restore = createStateRestore<StateCodec, State>(StateCodec, "COUNT_STATE");
 * const recoverStateCase = caseFn(restore.restoreSuccess, (s: State, { value }) => ({ ...s, ...value }));
 *
 * store
 *   .addReducers(recoverStateCase)
 *   .addRunOnces(restore.restoreStateRunOnce, restore.saveStateRunOnce);
 */
export const createStateRestore = <A, B extends A>(codec: C.Codec<A>, key: string) => {
  const restoreSuccess = restoreSuccessFactory<A>(key);
  const saveStateRunOnce = saveStateFactory<A, B>(codec, key);
  const restoreStateRunOnce = restoreStateFactory<A, B>(codec, key, restoreSuccess);
  return {
    restoreSuccess,
    restoreFailed,
    saveStateRunOnce,
    restoreStateRunOnce,
  };
};
