import "./SpellTable.scss";

import { h, FunctionalComponent, Fragment } from "preact";
import { Spell } from "~/store";
import { SpellCard } from "../SpellCard";

interface SpellTableProps {
  spells: Spell[];
}

export const SpellTable: FunctionalComponent<SpellTableProps> = ({ spells }) => {
  return (
    <Fragment>
      <section class="spell-table">
        {spells.length === 0 ? <h3>No Spells To Show!</h3> : null}
        {spells.slice(0, 50).map((spell) => (
          <SpellCard fixed={false} spell={spell}></SpellCard>
        ))}
      </section>
      {spells.length > 50 ? (
        <span>There are {spells.length - 50} more spells not shown.</span>
      ) : null}
    </Fragment>
  );
};
