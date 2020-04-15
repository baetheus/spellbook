import { h, FunctionalComponent } from "preact";

import { SearchSpells } from "~/components/SearchSpells";
import { Header } from "~/components/Header/Header";
import { SpellList, BookList } from "~/components/SpellList";
import { FilterSpells } from "~/components/FilterSpells";

export const SpellBookPage: FunctionalComponent<{}> = () => {
  return (
    <main class="fld-col ai-stc vh-vh100 vw-p100">
      <Header />
      <section class="fld-col flg-4 pwa-4">
        <SearchSpells />
        <FilterSpells />
        <section class="fld-col fld-sm-row flg-6">
          <SpellList />
          <BookList />
        </section>
      </section>
    </main>
  );
};
