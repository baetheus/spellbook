if (process.env.NODE_ENV === "development") {
  require("preact/debug");
}

import { h, render } from "preact";
import { Router, route } from "preact-router";
import { filterEvery } from "@nll/dux/Store";

import { PrintPage } from "./pages/PrintPage";
import { BrowsePage } from "./pages/BrowsePage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { AboutPage } from "./pages/AboutPage/AboutPage";
import { createClient, authStore, redirectCallback } from "./store/auth";

// TODO Pull this into environment configuration
const domain = process.env.AUTH0_DOMAIN;
const client_id = process.env.AUTH0_CLIENT_ID;
const redirect_uri = window.location.origin;

if (domain === undefined || client_id === undefined) {
  throw new Error("missing env vars");
}

/**
 * Start Auth Recovery
 */
const startAuth = createClient.pending({ domain, client_id, redirect_uri });
authStore.addRunEverys(
  filterEvery(redirectCallback.success, (_, a) => {
    const targetUrl = a.value.result.appState?.targetUrl ?? window.location.pathname;
    route(targetUrl);
  })
);
authStore.dispatch(startAuth);

/**
 * Run App
 */
const App = () => {
  return (
    <Router>
      <BrowsePage path="/" />
      <PrintPage path="/print" />
      <AboutPage path="/about" />
      <NotFoundPage default />
    </Router>
  );
};

render(<App />, document.body);
