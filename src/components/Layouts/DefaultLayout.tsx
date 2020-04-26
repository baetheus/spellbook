import { h, FunctionalComponent } from "preact";

import { Header } from "~/components/Header/Header";
import { Footer } from "../Footer";

interface DefaultLayoutProps {
  width?: 0 | 1 | 2;
}

const toWidthClass = (width?: 0 | 1 | 2): string => {
  switch (width) {
    case 2:
      return "vwcmx-em2";
    case 1:
      return "vwcmx-em1";
    default:
    case 0:
      return "vwcmx-em0";
  }
};

export const DefaultLayout: FunctionalComponent<DefaultLayoutProps> = ({ children, width }) => {
  return (
    <main class={`vhmn-vh100 vwcmx-em0 vwc-p100 fld-col ai-ctr pwx-4 ${toWidthClass(width)}`}>
      <Header />
      <section class="fls-1-1 fld-col flg-4 ai-stc">{children}</section>
      <Footer className="brt-1" />
    </main>
  );
};
