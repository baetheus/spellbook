import "./CreatureTable.scss";

import { h, FunctionalComponent, Fragment } from "preact";
import { Link } from "preact-router";

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
  return (
    <Fragment>
      {creatures.length === 0 ? <h3 class="as-ctr js-ctr ta-c">No Creatures To Show!</h3> : null}
      <section class="creature-table">
        {creatures.map((creature) => (
          <section class="fld-col flg-3">
            <CreatureCard
              fixed={false}
              creature={creature}
              theme={selected.has(creature.name) ? "ct-primary" : "ct-dark"}
              onClick={toggleCreature}
            ></CreatureCard>
            <Link
              class="vw-p100 pwy-3 ct-primary bra-1 fw-u1 ta-c"
              href={`/creatures/${creature.id}`}
            >
              Edit
            </Link>
          </section>
        ))}
      </section>
    </Fragment>
  );
};
