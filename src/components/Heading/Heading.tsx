import { h, FunctionalComponent } from "preact";

export const Heading: FunctionalComponent<{}> = ({ children }) => (
  <header class="vw-p100 bwb-2 pwx-2">{children}</header>
);
