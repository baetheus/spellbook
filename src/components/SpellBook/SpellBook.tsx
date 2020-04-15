import { h, FunctionalComponent } from "preact";
import { useCallback } from "preact/hooks";

import { Spell, useStore, selectSpells, useDispatch, toggleSpell } from "~/store";
import { SchoolIcon } from "~/components/SpellCard";

interface SpellItemProps {
  onClick: (s: Spell) => void;
  spell: Spell;
}

const SpellItem: FunctionalComponent<SpellItemProps> = ({ onClick, spell }) => {
  const handleClick = useCallback(() => onClick(spell), [onClick, spell]);
  return (
    <li>
      <button
        onClick={handleClick}
        class="fld-row flg-3 pwy-2 pwx-4 crsr-pointer ct-light-on-hover"
      >
        <SchoolIcon school={spell.school} />
        <span>{spell.name}</span>
      </button>
    </li>
  );
};

interface SpellBookProps {}

export const SpellBook: FunctionalComponent<SpellBookProps> = () => {
  const [spells] = useStore(selectSpells);
  const [toggle] = useDispatch(toggleSpell);

  return (
    <ul class="fld-col flg-3 pwa-2 ai-stc vhmx-vh60 ova-au">
      {spells.map((spell) => (
        <SpellItem spell={spell} onClick={toggle} />
      ))}
    </ul>
  );
};
