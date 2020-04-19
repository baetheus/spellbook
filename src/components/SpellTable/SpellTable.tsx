import "./SpellTable.scss";

import { h, FunctionalComponent, Fragment } from "preact";
import { useCallback } from "preact/hooks";

import { Spell } from "~/store";
import { SpellCard } from "../SpellCard";

interface SpellTableProps {
  spells: Spell[];
  book: Set<string>;
  toggleSpell: (s: Spell) => void;
}

export const SpellTable: FunctionalComponent<SpellTableProps> = ({ spells, book, toggleSpell }) => {
  const toTop = useCallback(() => scrollTo(0, 0), []);

  return (
    <Fragment>
      {spells.length === 0 ? <h3 class="as-ctr js-ctr ta-c">No Spells To Show!</h3> : null}
      <section class="spell-table">
        {spells.slice(0, 100).map((spell) => (
          <SpellCard
            fixed={false}
            spell={spell}
            theme={book.has(spell.name) ? "ct-primary" : "ct-dark"}
            onClick={toggleSpell}
          ></SpellCard>
        ))}
      </section>
      <section class="fld-row flg-4 jc-spb pwx-4 pwb-4">
        {spells.length > 100 ? (
          <span class="vw-p100">There are {spells.length - 100} more spells not shown.</span>
        ) : null}{" "}
        <button class="pwx-4 pwy-3 ct-primary bra-1" onClick={toTop}>
          <strong>Up</strong>
        </button>
      </section>
    </Fragment>
  );
};
