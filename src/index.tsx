if (process.env.NODE_ENV === "development") {
  require("preact/debug");
}

import { h, render } from "preact";
import { Router } from "preact-router";
import { SpellBookPage } from "./pages/SpellBookPage";
import { TestPage } from "./pages/TestPage";

/**
 * Run App
 */
const App = () => (
  <Router>
    <SpellBookPage path="/" />
    <TestPage path="/test" />
  </Router>
);

render(<App />, document.body);
