if (process.env.NODE_ENV === "development") {
  require("preact/debug");
}

import { h, render } from "preact";
import { Router } from "preact-router";
import { SpellBookPage } from "./pages/SpellBookPage/SpellBookPage";

/**
 * Run App
 */
const App = () => (
  <Router>
    <SpellBookPage path="/" />
  </Router>
);

render(<App />, document.body);
