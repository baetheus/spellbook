import { h, FunctionalComponent } from "preact";
import { useStore, selectSpells, useDispatch, toggleSpell } from "~/store";

import { SpellItem } from "./SpellItem";

interface SpellListProps {}

export const SpellList: FunctionalComponent<SpellListProps> = () => {
  const [spells] = useStore(selectSpells);
  const [toggle] = useDispatch(toggleSpell);

  return (
    <section class="fld-col flg-4 vw-sm-p50">
      <h4>
        Available Spells{" "}
        <span class="fs-d4">
          {spells.length} Spell{spells.length === 1 ? "" : "s"}
        </span>
      </h4>
      <ul class="fld-col flg-4 pwa-2 ai-stc vhmx-vh40 ova-au">
        {spells.length === 0 ? <h6>No Spells To Show!</h6> : null}
        {spells.map((spell) => (
          <SpellItem spell={spell} onClick={toggle} />
        ))}
      </ul>
    </section>
  );
};
