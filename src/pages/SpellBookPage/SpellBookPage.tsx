import { h, FunctionalComponent } from "preact";

import { SearchSpells } from "~/components/SearchSpells";
import { Header } from "~/components/Header/Header";
import { SpellList, BookList } from "~/components/SpellList";
import { FilterSpells } from "~/components/FilterSpells";
import { DefaultLayout } from "~/components/Layouts";

export const SpellBookPage: FunctionalComponent<{}> = () => {
  return (
    <DefaultLayout>
      <section class="fld-col flg-4 pwa-4">
        <SearchSpells />
        <FilterSpells />
        <section class="fld-col fld-sm-row flg-6">
          <SpellList />
          <BookList />
        </section>
      </section>
    </DefaultLayout>
  );
};
