import "./SpellCard.scss";

import { h, FunctionalComponent } from "preact";

import { toSpellComponents, toSpellType } from "~/libraries/spells";
import { Spell } from "~/store/spells";
import { useCallback } from "preact/hooks";
import { notNil } from "~/libraries/fns";
import classNames from "classnames";

import { ClassIcon } from "./ClassIcon";

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
  if (s.description.length > 3500) {
    return "fs-d4";
  } else if (s.description.length > 2500) {
    return "fs-d3";
  } else if (s.description.length > 1700) {
    return "fs-d2";
  } else if (s.description.length > 1000) {
    return "fs-d1";
  } else {
    return "";
  }
};

export const SpellCard: FunctionalComponent<SpellCardProps> = ({
  spell,
  className = "",
  fixed = true,
  theme = "ct-dark",
  onClick,
}) => {
  const hasClick = notNil(onClick);
  const clickHandler = onClick ?? (() => {});
  const handleClick = useCallback(() => clickHandler(spell), [spell, onClick]);
  const handleKeyUp = useCallback<h.JSX.KeyboardEventHandler<any>>(
    (e) => {
      if (e.code === "Enter" || e.code === "Space") {
        e.preventDefault();
        clickHandler(spell);
      }
    },
    [spell, onClick]
  );
  
  const articleClasses = classNames(
    "spell-card pwx-4 pwt-4 pwb-2 bra-1",
    { "fixed-card": fixed, "fs-d2": fixed, "crsr-pointer": hasClick },
    className,
    theme
  );
  const descriptionClasses = classNames(
    "desc ct-base pwt-3 pwx-3 brb-1 inner-children ov-hi",
    toFontSize(spell)
  );

  return (
    <article
      tabIndex={hasClick ? 0 : undefined}
      aria-label={`${spell.name} Spell Card`}
      class={articleClasses}
      onClick={handleClick}
      onKeyPress={handleKeyUp}
    >
      <h1 class="head ct-base ta-c brt-1 fs-u4">{spell.name}</h1>
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
        <strong class="mats ta-c fs-d2">
          {spell.components.materials.map((m) => (
            <p>{m}</p>
          ))}
        </strong>
      ) : null}
      <section
        class={descriptionClasses}
        dangerouslySetInnerHTML={{ __html: spell.description }}
      ></section>
      <footer class="spel fld-row jc-spb fs-d1">
        <strong>{toSpellType(spell)}</strong>
        <section class="fld-row flg-2 fs-u1">
          {spell.class.map((c) => (
            <ClassIcon cls={c} />
          ))}
        </section>
      </footer>
    </article>
  );
};
