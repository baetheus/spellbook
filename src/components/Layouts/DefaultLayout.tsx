import { h, FunctionalComponent } from "preact";

import { Header } from "~/components/Header/Header";
import { Footer } from "../Footer";

export const DefaultLayout: FunctionalComponent<{}> = ({ children }) => {
  return (
    <main class="fld-col ai-stc vh-vh100 vw-p100">
      <Header />
      <section class="fls-1-1 fld-col ai-stc">{children}</section>
      <Footer />
    </main>
  );
};
