import "./SpellTable.scss";

import { h, FunctionalComponent, Fragment } from "preact";
import { Spell } from "~/store";
import { SpellCard } from "../SpellCard";

interface SpellTableProps {
  spells: Spell[];
  book: Set<string>;
  toggleSpell: (s: Spell) => void;
}

export const SpellTable: FunctionalComponent<SpellTableProps> = ({ spells, book, toggleSpell }) => {
  return (
    <Fragment>
      <section class="spell-table">
        {spells.length === 0 ? <h3>No Spells To Show!</h3> : null}
        {spells.slice(0, 100).map((spell) => (
          <SpellCard
            fixed={false}
            spell={spell}
            theme={book.has(spell.name) ? "ct-primary" : "ct-dark"}
            onClick={toggleSpell}
          ></SpellCard>
        ))}
      </section>
      {spells.length > 100 ? (
        <span class="vw-p100 ta-c">There are {spells.length - 100} more spells not shown.</span>
      ) : null}
    </Fragment>
  );
};
