import { FunctionalComponent } from "preact";
import { route } from "preact-router";
import { Fn } from "~/libraries/types";

interface RedirectProps {
  to: string;
  and?: Fn<never[], void>;
}

export const Redirect: FunctionalComponent<RedirectProps> = ({ to, and }) => {
  if (typeof and === "function") {
    setTimeout(and, 0);
  }
  route(to);
  return null;
};
