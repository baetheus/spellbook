import { h, FunctionalComponent } from "preact";

import { SearchSpells } from "~/components/SearchSpells";
import { SpellList, BookList } from "~/components/SpellList";
import { DefaultLayout } from "~/components/Layouts";

export const SpellBookPage: FunctionalComponent<{}> = () => {
  return (
    <DefaultLayout>
      <section class="fld-col flg-4 pwa-4">
        <SearchSpells />
        <section class="fld-col fld-sm-row flg-6">
          <SpellList />
          <BookList />
        </section>
      </section>
    </DefaultLayout>
  );
};
