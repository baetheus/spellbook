import { h, FunctionalComponent } from "preact";

import { Header } from "~/components/Header/Header";
import { Footer } from "../Footer";

export const DefaultLayout: FunctionalComponent<{}> = ({ children }) => {
  return (
    <main class="vhmn-vh100 vw-p100 vwcmx-em1 vwc-p100 fld-col ai-ctr  pwx-4 ova-vi">
      <Header />
      <section class="fls-1-1 fld-col flg-4 ai-stc">{children}</section>
      <Footer className="brt-1" />
    </main>
  );
};
