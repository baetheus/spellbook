import "./Print.scss";

import { h, FunctionalComponent } from "preact";
import { useSpells, selectBook } from "~/store/spells";
import { SpellCard } from "~/components/SpellCard";

export const Print: FunctionalComponent<{}> = () => {
  let [spells] = useSpells(selectBook);

  return (
    <main class="flw-wrap fld-row">
      {spells.map((spell) => (
        <SpellCard spell={spell}></SpellCard>
      ))}
    </main>
  );
};
