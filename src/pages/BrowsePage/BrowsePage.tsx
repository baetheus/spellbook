import { h, FunctionalComponent } from "preact";
import { DefaultLayout } from "~/components/Layouts";
import { SearchSpells } from "~/components/SearchSpells";
import { useStore, selectSpells } from "~/store";
import { SpellTable } from "~/components/SpellTable/SpellTable";
import { FilterSpells } from "~/components/FilterSpells";

export const BrowsePage: FunctionalComponent<{}> = () => {
  const [spells] = useStore(selectSpells);

  return (
    <DefaultLayout>
      <section class="fld-col flg-4 pwa-4">
        <SearchSpells />
        <FilterSpells />
        <SpellTable spells={spells} />
      </section>
    </DefaultLayout>
  );
};
