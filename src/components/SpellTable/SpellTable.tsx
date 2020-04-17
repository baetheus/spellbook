import "./SpellTable.scss";

import { h, FunctionalComponent } from "preact";
import { Spell } from "~/store";
import { SpellCard } from "../SpellCard";

interface SpellTableProps {
  spells: Spell[];
}

export const SpellTable: FunctionalComponent<SpellTableProps> = ({ spells }) => {
  return (
    <section class="spell-table">
      {spells.map((spell) => (
        <SpellCard fixed={false} spell={spell}></SpellCard>
      ))}
    </section>
  );
};
