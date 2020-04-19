import { h, FunctionalComponent } from "preact";
import { DefaultLayout } from "~/components/Layouts";
import { SearchSpells } from "~/components/SearchSpells";
import { useStore, selectSpells, selectBook, useDispatch, toggleSpell } from "~/store";
import { SpellTable } from "~/components/SpellTable/SpellTable";

export const BrowsePage: FunctionalComponent<{}> = () => {
  const [spells] = useStore(selectSpells);
  const [book] = useStore(selectBook);
  const [handleToggle] = useDispatch(toggleSpell);

  return (
    <DefaultLayout>
      <section class="fld-col flg-4 pwa-4">
        <SearchSpells />
        <SpellTable spells={spells} book={book} toggleSpell={handleToggle} />
      </section>
    </DefaultLayout>
  );
};
