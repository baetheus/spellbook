import { h, FunctionalComponent } from "preact";

import { Header } from "~/components/Header/Header";

export const DefaultLayout: FunctionalComponent<{}> = ({ children }) => {
  return (
    <main class="fld-col ai-stc vh-vh100 vw-p100">
      <Header />
      {children}
    </main>
  );
};
