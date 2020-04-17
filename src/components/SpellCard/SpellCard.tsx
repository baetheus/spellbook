import "./SpellCard.scss";

import { h, FunctionalComponent } from "preact";
import memoize from "lodash/memoize";

import { toSpellComponents, toSpellType } from "~/libraries/spells";
import { Spell } from "~/store";
import { ClassIcon } from "./ClassIcon";

interface SpellCardProps {
  spell: Spell;
  fixed?: boolean;
  className?: string;
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

export const SpellCard: FunctionalComponent<SpellCardProps> = memoize(
  ({ spell, className = "", fixed = true }) => (
    <div
      class={`${
        fixed ? "fixed-card" : "unfixed-card"
      } fld-col flg-2 ct-dark fs-d2 pwx-4 pwt-4 pwb-2 bra-1 ${className}`}
    >
      <header class="fld-col flg-2 ai-stc">
        <h2 class="ct-base ta-c brt-1">{spell.name}</h2>
        <section class="fld-row flg-2 fs-d1">
          <section class="ct-base flb-p50 ta-c">
            <h6>Casting Time</h6>
            <p>{spell.casting_time}</p>
          </section>
          <section class="ct-base flb-p50 ta-c">
            <h6>Range</h6>
            <p>{spell.range}</p>
          </section>
        </section>
        <section class="fld-row flg-2 fs-d1">
          <section class="ct-base flb-p50 ta-c">
            <h6>Components</h6>
            <p>{toSpellComponents(spell)}</p>
          </section>
          <section class="ct-base flb-p50 ta-c">
            <h6>Duration</h6>
            <p>{spell.duration}</p>
          </section>
        </section>
      </header>
      {spell.components.materials.length ? (
        <section class="ta-c fs-d2">
          {spell.components.materials.map((m) => (
            <p>{m}</p>
          ))}
        </section>
      ) : null}
      <section
        class={`ct-base vhmn-3 fls-1-1 pwa-2 brb-1 ta-j line-break-children ov-au ${toFontSize(
          spell
        )}`}
        dangerouslySetInnerHTML={{ __html: spell.description }}
      ></section>
      <footer class="fld-row jc-spb fs-d1">
        <section>{toSpellType(spell)}</section>
        <section class="fld-row flg-2 fs-u1">
          {spell.class.map((c) => (
            <ClassIcon cls={c} />
          ))}
        </section>
      </footer>
    </div>
  ),
  ({ spell, className, fixed }: SpellCardProps) => `${spell.name}${className}${fixed}`
);
