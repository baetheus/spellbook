if (process.env.NODE_ENV === "development") {
  require("preact/debug");
}

import { h, render } from "preact";
import { Router } from "preact-router";

import { Home } from "./pages/Home";
import { Print } from "./pages/Print";

const App = () => (
  <Router>
    <Home path="/" />
    <Print path="/print"></Print>
  </Router>
);

render(<App />, document.body);
