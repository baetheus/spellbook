import "./CreatureCard.scss";

import { h, FunctionalComponent } from "preact";
import { useCallback } from "preact/hooks";

import { Creature } from "~/store/creatures";
import { If } from "~/components/Control";
import { Markdown } from "../Markdown";
import { notNil } from "~/libraries/fns";

interface CreatureCardProps {
  fixed?: boolean;
  className?: string;
  theme?: string;
  creature: Creature;
  onClick?: (s: Creature) => void;
}

const toAbilityMod = (val?: number): string => {
  if (typeof val !== "number") {
    return "+0";
  }
  if (val < 0) {
    return `${val}`;
  }
  return `+${val}`;
};

export const CreatureCard: FunctionalComponent<CreatureCardProps> = ({
  fixed = false,
  className = "",
  theme = "ct-dark",
  creature,
  onClick,
}) => {
  const hasClick = notNil(onClick);
  const clickHandler = onClick ?? (() => {});
  const handleClick = useCallback(() => clickHandler(creature), [creature, onClick]);
  const handleKeyUp = useCallback<h.JSX.KeyboardEventHandler<any>>(
    (e) => {
      if (e.code === "Enter" || e.code === "Space") {
        e.preventDefault();
        clickHandler(creature);
      }
    },
    [creature, onClick]
  );

  return (
    <article
      tabIndex={hasClick ? 0 : undefined}
      aria-label={`Creature Card - ${creature.name}`}
      class={`${
        fixed ? "fixed-card fs-d3" : "unfixed-card"
      } creature-card pwx-4 pwt-4 pwb-2 bra-1 fld-col flg-2 ${
        hasClick ? "crsr-pointer" : ""
      } ${className} ${theme}`}
      onClick={handleClick}
      onKeyPress={handleKeyUp}
    >
      <h1 class="ct-base ta-c brt-1 fs-u4">{creature.name}</h1>

      <section class="fs-d1 fw-u1 ta-c">{creature.type}</section>

      <section class="creature-stats ct-base pwa-3">
        <section class="ac fld-row flg-2 fls-1-1 ta-c">
          <strong>AC:</strong>
          <span>{creature.ac}</span>
          <If predicate={typeof creature.armor === "string"}>
            <span>({creature.armor})</span>
          </If>
        </section>

        <section class="hp fld-row flg-2 fls-1-1">
          <strong>HP:</strong>
          <span>{creature.hp}</span>
        </section>

        <section class="spd fld-row flg-2 fls-1-1">
          <strong>Speed:</strong>
          <span>{creature.speed}</span>
        </section>

        <section class="str fls-1-1 ta-c">
          <h4>STR</h4>
          <h5>{toAbilityMod(creature.str)}</h5>
        </section>
        <section class="dex fls-1-1 ta-c">
          <h4>DEX</h4>
          <h5>{toAbilityMod(creature.dex)}</h5>
        </section>
        <section class="con fls-1-1 ta-c">
          <h4>CON</h4>
          <h5>{toAbilityMod(creature.con)}</h5>
        </section>
        <section class="int fls-1-1 ta-c">
          <h4>INT</h4>
          <h5>{toAbilityMod(creature.int)}</h5>
        </section>
        <section class="wis fls-1-1 ta-c">
          <h4>WIS</h4>
          <h5>{toAbilityMod(creature.wis)}</h5>
        </section>
        <section class="cha fls-1-1 ta-c">
          <h4>CHA</h4>
          <h5>{toAbilityMod(creature.cha)}</h5>
        </section>
      </section>

      <Markdown
        className={`inner-children ct-base fls-1-1 fld-col flg-1 pwa-3`}
        markdown={`${creature.features}\n\n${creature.traits}`}
      ></Markdown>

      <If predicate={!!creature.actions}>
        <section class="fls-1-1 ct-base pwa-3">
          <h4>Actions</h4>
          <Markdown markdown={creature.actions as string}></Markdown>
        </section>
      </If>

      <If predicate={!!creature.reactions}>
        <section class="fls-1-1 ct-base pwa-3">
          <h4>Reactions</h4>
          <Markdown markdown={creature.reactions as string}></Markdown>
        </section>
      </If>

      <footer class="fld-row jc-spb fs-d1">
        <strong>
          CR {creature.rating} ({creature.experience.toLocaleString()} XP)
        </strong>
        <strong class="fld-row flg-2 fs-d1">
          <span>{creature.source}</span>
          <If predicate={!!creature.page}>
            <span>{creature.page}</span>
          </If>
        </strong>
      </footer>
    </article>
  );
};
