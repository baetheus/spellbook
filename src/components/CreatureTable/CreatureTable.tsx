import "./CreatureTable.scss";

import { h, FunctionalComponent, Fragment } from "preact";
import { useCallback } from "preact/hooks";

import { Creature, Creatures } from "~/store/creatures";
import { CreatureCard } from "../CreatureCard";

interface CreatureTableProps {
  creatures: Creatures;
  selected: Set<string>;
  toggleCreature: (s: Creature) => void;
}

export const CreatureTable: FunctionalComponent<CreatureTableProps> = ({
  creatures,
  selected,
  toggleCreature,
}) => {
  const toTop = useCallback(() => scrollTo(0, 0), []);

  return (
    <Fragment>
      {creatures.length === 0 ? <h3 class="as-ctr js-ctr ta-c">No Creatures To Show!</h3> : null}
      <section class="creature-table">
        {creatures.map((creature) => (
          <CreatureCard
            fixed={false}
            creature={creature}
            theme={selected.has(creature.name) ? "ct-primary" : "ct-dark"}
            onClick={toggleCreature}
          ></CreatureCard>
        ))}
      </section>

      <section class="fls-1-1 fld-col ai-ctr jc-end flg-4 mwb-4">
        <button class="vw-p100 vwmx-ch0 wx-4 pwy-3 ct-primary bra-1" onClick={toTop}>
          <strong>Up</strong>
        </button>
      </section>
    </Fragment>
  );
};
