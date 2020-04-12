import { h, FunctionalComponent } from "preact";
import * as S from "~/store/spells";
import { useCallback } from "preact/hooks";
import { Table } from "~/components/Table";
import { FilterList } from "~/components/FilterList";
import { classFilterConfig, spellTableColumns } from "./HomeConfig";

export interface HomeProps {}

/**
 * @name Home
 * @example
 * <Home />
 */
export const Home: FunctionalComponent<HomeProps> = () => {
  const [spells, dispatch] = S.useSpells(S.selectSpells);
  const [book] = S.useSpells(S.bookL.get);
  const [classes] = S.useSpells(S.classL.get);

  const handleSpellClick = useCallback((s: S.Spell) => dispatch(S.toggleSpell(s)), [dispatch]);
  const handleClassClick = useCallback((c: S.Class) => dispatch(S.toggleClass(c)), [dispatch]);

  return (
    <main class="pwa-4 fld-col flg-4">
      <h1>Spellbook</h1>

      <ul>
        <h4>Filters</h4>
        <FilterList<S.Class>
          select={handleClassClick}
          config={classFilterConfig}
          selected={classes}
        ></FilterList>
      </ul>

      <section>
        <h4>Selected Spells</h4>
        {book.length === 0 && <h5>No Spells Selected!</h5>}
        <Table<S.Spell> select={handleSpellClick} columns={spellTableColumns} items={book}></Table>
      </section>

      <section>
        <h4>Available Spells</h4>
        {spells.length === 0 && <h5>No Spells Available!</h5>}
        <Table<S.Spell>
          select={handleSpellClick}
          columns={spellTableColumns}
          items={spells}
        ></Table>
      </section>
    </main>
  );
};
