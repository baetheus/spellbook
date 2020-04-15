import "./SpellCard.scss";

import { h, FunctionalComponent } from "preact";
import { Spell } from "~/store";

interface SpellCardProps {
  spell: Spell;
}

export const SpellCard: FunctionalComponent<SpellCardProps> = ({ spell }) => (
  <section>{spell.name}</section>
);
