import "./SpellCard.scss";

import { h, FunctionalComponent } from "preact";
import { Spell } from "~/store/spells";
import { ordinal } from "~/libraries/numbers";

interface SpellCardProps {
  spell: Spell;
}

const toSpellType = (s: Spell): string => {
  if (s.level === 0) {
    return `${s.school} Cantrip`;
  }
  return `${ordinal(s.level)} Level ${s.school}`;
};

export const SpellCard: FunctionalComponent<SpellCardProps> = ({ spell }) => (
  <article class="ct-primary fld-col flg-4 vw-ch0 mwa-2">
    <header class="ct-base bra-1 ta-c">{spell.name}</header>
    <section dangerouslySetInnerHTML={{ __html: spell.description }}></section>
    <footer>{toSpellType(spell)}</footer>
  </article>
);
