import { h, FunctionalComponent, Fragment } from "preact";

import { Fn } from "~/libraries/types";

interface IfProps {
  predicate: boolean | Fn<[], boolean>;
}

export const If: FunctionalComponent<IfProps> = ({ predicate, children }) => {
  const render = typeof predicate === "function" ? predicate() : predicate;
  if (render) {
    return <Fragment>{children}</Fragment>;
  }
  return null;
};
