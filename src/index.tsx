if (process.env.NODE_ENV === "development") {
  require("preact/debug");
}

import { h, render } from "preact";
import { Router } from "preact-router";
import { isRight, tryCatch, chain, filterOrElse, mapLeft } from "fp-ts/lib/Either";
import { pipe } from "fp-ts/lib/pipeable";
import { formatValidationError } from "io-ts-reporters";

import { store, recoverState, StateCodec, STORAGE_KEY } from "~/store/spells";

import { Home } from "./pages/Home";
import { Print } from "./pages/Print";
import { notNil } from "./libraries/fns";
import { isSome } from "fp-ts/lib/Option";

/**
 * Recover State
 */
const state = pipe(
  tryCatch(
    () => window.localStorage.getItem(STORAGE_KEY),
    (_) => "Failed to get state from localStorage"
  ),
  filterOrElse(notNil, (_) => "State returned by localStorage is null"),
  chain((s) =>
    tryCatch(
      (): unknown => JSON.parse(s),
      (_) => "Failed to parse json"
    )
  ),
  chain((s) =>
    pipe(
      StateCodec.decode(s),
      mapLeft((e) =>
        e
          .map(formatValidationError)
          .filter(isSome)
          .map((n) => n.value)
          .join("\n\n")
      )
    )
  )
);

if (isRight(state)) {
  store.dispatch(recoverState(state.right));
} else {
  console.warn(state.left);
}

/**
 * Run App
 */
const App = () => (
  <Router>
    <Home path="/" />
    <Print path="/print"></Print>
  </Router>
);

render(<App />, document.body);
