import { FunctionalComponent, h } from "preact";
import { useCallback } from "preact/hooks";
import memoize from "lodash/memoize";

import { Spell } from "~/store";

import { SchoolIcon } from "~/components/SpellCard";
import { toSpellType } from "~/libraries/spells";
import { ClassIcon } from "../SpellCard/ClassIcon";

interface SpellItemProps {
  onClick: (s: Spell) => void;
  spell: Spell;
}

export const SpellItem: FunctionalComponent<SpellItemProps> = memoize(
  ({ onClick, spell }) => {
    const handleClick = useCallback(() => onClick(spell), [onClick, spell]);
    return (
      <li>
        <button
          onClick={handleClick}
          class="fld-row flg-3 ai-str jc-spb vw-p100 bra-1 pwy-2 pwx-4 crsr-pointer ct-light-on-hover"
        >
          <section class="fld-col flg-3 ai-str">
            <span>{spell.name}</span>
            <span class="fs-d2">{toSpellType(spell)}</span>
          </section>
          <section class="fld-row flg-3 fs-d2">
            <SchoolIcon school={spell.school} />
            {spell.class.map((c) => (
              <ClassIcon cls={c} />
            ))}
          </section>
        </button>
      </li>
    );
  },
  ({ spell, onClick }: SpellItemProps) => `${spell.name}${onClick.name}`
);
