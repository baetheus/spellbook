if (process.env.NODE_ENV === "development") {
  require("preact/debug");
}

import { h, render } from "preact";
import { Router } from "preact-router";
import { PrintPage } from "./pages/PrintPage";
import { BrowsePage } from "./pages/BrowsePage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { AboutPage } from "./pages/AboutPage/AboutPage";

/**
 * Run App
 */
const App = () => (
  <Router>
    <BrowsePage path="/" />
    <PrintPage path="/print" />
    <AboutPage path="/about" />
    <NotFoundPage default />
  </Router>
);

render(<App />, document.body);
