import { h, FunctionalComponent } from "preact";
import { DefaultLayout } from "~/components/Layouts";
import { SearchSpells } from "~/components/SearchSpells";
import { useStore, selectBrowseSpells } from "~/store";
import { SpellTable } from "~/components/SpellTable/SpellTable";

export const BrowsePage: FunctionalComponent<{}> = () => {
  const [spells] = useStore(selectBrowseSpells);

  return (
    <DefaultLayout>
      <section class="fld-col flg-4 pwa-4">
        <SearchSpells />
        <SpellTable spells={spells} />
      </section>
    </DefaultLayout>
  );
};