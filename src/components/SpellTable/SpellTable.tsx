import "./SpellTable.scss";

import { h, FunctionalComponent, Fragment } from "preact";
import { useCallback } from "preact/hooks";

import { Spell, useStore, showSpellCountL, Spells } from "~/store";
import { SpellCard } from "../SpellCard";

interface SpellTableProps {
  spells: Spells;
  book: Set<string>;
  toggleSpell: (s: Spell) => void;
}

export const SpellTable: FunctionalComponent<SpellTableProps> = ({ spells, book, toggleSpell }) => {
  const toTop = useCallback(() => scrollTo(0, 0), []);
  const [spellCount] = useStore(showSpellCountL.get);

  const _spells = spellCount === "All" ? spells : spells.slice(0, spellCount);

  return (
    <Fragment>
      {spells.length === 0 ? <h3 class="as-ctr js-ctr ta-c">No Spells To Show!</h3> : null}
      <section class="spell-table">
        {_spells.map((spell) => (
          <SpellCard
            fixed={false}
            spell={spell}
            theme={book.has(spell.name) ? "ct-primary" : "ct-dark"}
            onClick={toggleSpell}
          ></SpellCard>
        ))}
      </section>

      <section class="fls-1-1 fld-col ai-ctr jc-end flg-4 mwb-4">
        {spells.length > _spells.length ? (
          <span class="vw-p100 ta-c">
            There are {spells.length - _spells.length} more spells not shown.
          </span>
        ) : null}

        <button class="vw-p100 vwmx-ch0 wx-4 pwy-3 ct-primary bra-1" onClick={toTop}>
          <strong>Up</strong>
        </button>
      </section>
    </Fragment>
  );
};
