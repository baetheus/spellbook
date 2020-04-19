import "./SpellCard.scss";

import { h, FunctionalComponent } from "preact";

import { toSpellComponents, toSpellType } from "~/libraries/spells";
import { Spell } from "~/store";
import { ClassIcon } from "./ClassIcon";
import { useCallback } from "preact/hooks";

interface SpellCardProps {
  spell: Spell;
  fixed?: boolean;
  className?: string;
  theme?: string;
  onClick?: (s: Spell) => void;
}

// Some spell descriptions are looooooong Eventually this will need to be
// Revisted to double up spell cards
const toFontSize = (s: Spell): string => {
  if (s.description.length > 2800) {
    return "fs-d5";
  } else if (s.description.length > 2000) {
    return "fs-d4";
  } else if (s.description.length > 1300) {
    return "fs-d2";
  } else {
    return "";
  }
};

export const SpellCard: FunctionalComponent<SpellCardProps> = ({
  spell,
  className = "",
  fixed = true,
  theme = "ct-dark",
  onClick = () => {},
}) => {
  const handleClick = useCallback(() => onClick(spell), [spell, onClick]);
  const handleKeyUp = useCallback<h.JSX.KeyboardEventHandler<any>>(
    (e) => {
      if (e.code === "Enter" || e.code === "Space") {
        e.preventDefault();
        onClick(spell);
      }
    },
    [spell, onClick]
  );

  return (
    <article
      tabIndex={0}
      aria-label={`${spell.name} spell card - ${theme === "ct-dark" ? "Unselected" : "Selected"}`}
      class={`card ${
        fixed ? "fixed-card fs-d2" : "unfixed-card"
      } pwx-4 pwt-4 pwb-2 bra-1 ${className} ${theme}`}
      onClick={handleClick}
      onKeyPress={handleKeyUp}
    >
      <h2 class="head ct-base ta-c brt-1">{spell.name}</h2>
      <section class="time ct-base ta-c">
        <h6>Casting Time</h6>
        <p>{spell.casting_time}</p>
      </section>
      <section class="rang ct-base ta-c">
        <h6>Range</h6>
        <p>{spell.range}</p>
      </section>
      <section class="comp ct-base ta-c">
        <h6>Components</h6>
        <p>{toSpellComponents(spell)}</p>
      </section>
      <section class="dura ct-base ta-c">
        <h6>Duration</h6>
        <p>{spell.duration}</p>
      </section>
      {spell.components.materials.length ? (
        <section class="mats ta-c fs-d2">
          {spell.components.materials.map((m) => (
            <p>{m}</p>
          ))}
        </section>
      ) : null}
      <section
        class={`desc ct-base pwa-3 brb-1 inner-children ov-au ${toFontSize(spell)}`}
        dangerouslySetInnerHTML={{ __html: spell.description }}
      ></section>
      <footer class="spel fld-row jc-spb fs-d1">
        <section>{toSpellType(spell)}</section>
        <section class="fld-row flg-2 fs-u1">
          {spell.class.map((c) => (
            <ClassIcon cls={c} />
          ))}
        </section>
      </footer>
    </article>
  );
};
