import { h, FunctionalComponent } from "preact";

import { SearchSpells } from "~/components/SearchSpells";
import { Header } from "~/components/Header/Header";
import { SpellList } from "~/components/SpellList";
import { FilterSpells } from "~/components/FilterSpells";

export const SpellBookPage: FunctionalComponent<{}> = () => {
  return (
    <main class="fld-col ai-stc vh-vh100 vw-p100">
      <Header />
      <section class="fld-col flg-4 pwa-4">
        <SearchSpells />
        <FilterSpells />
        <SpellList />
      </section>
    </main>
  );
};
