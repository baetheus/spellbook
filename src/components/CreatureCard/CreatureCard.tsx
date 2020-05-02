import "./CreatureCard.scss";

import { h, FunctionalComponent } from "preact";
import { useCallback } from "preact/hooks";

import { Creature } from "~/store/creatures";
import { If } from "~/components/Control";

interface CreatureCardProps {
  fixed?: boolean;
  className?: string;
  theme?: string;
  creature: Creature;
  onClick?: (s: Creature) => void;
}

export const CreatureCard: FunctionalComponent<CreatureCardProps> = ({
  fixed = false,
  className = "",
  theme = "ct-dark",
  creature,
  onClick = () => {},
}) => {
  const handleClick = useCallback(() => onClick(creature), [creature, onClick]);
  const handleKeyUp = useCallback<h.JSX.KeyboardEventHandler<any>>(
    (e) => {
      if (e.code === "Enter" || e.code === "Space") {
        e.preventDefault();
        onClick(creature);
      }
    },
    [creature, onClick]
  );

  return (
    <article
      tabIndex={0}
      aria-label={`Creature Card - ${creature.name}`}
      class={`${
        fixed ? "fixed-card fs-d2" : "unfixed-card"
      } creature-card pwx-4 pwt-4 pwb-2 bra-1 fld-col flg-2 ${className} ${theme}`}
      onClick={handleClick}
      onKeyPress={handleKeyUp}
    >
      <h1 class="ct-base ta-c brt-1 fs-u4">{creature.name}</h1>
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
          <p>{creature.str}</p>
        </section>
        <section class="dex fls-1-1 ta-c">
          <h4>DEX</h4>
          <p>{creature.dex}</p>
        </section>
        <section class="con fls-1-1 ta-c">
          <h4>CON</h4>
          <p>{creature.con}</p>
        </section>
        <section class="int fls-1-1 ta-c">
          <h4>INT</h4>
          <p>{creature.int}</p>
        </section>
        <section class="wis fls-1-1 ta-c">
          <h4>WIS</h4>
          <p>{creature.wis}</p>
        </section>
        <section class="cha fls-1-1 ta-c">
          <h4>CHA</h4>
          <p>{creature.cha}</p>
        </section>
      </section>

      <section
        class={`ct-base fld-col flg-1 pwa-3`}
        dangerouslySetInnerHTML={{ __html: `${creature.features}${creature.traits}` }}
      ></section>

      <If predicate={!!creature.actions}>
        <section class="ct-base pwa-3">
          <h4>Actions</h4>
          <section dangerouslySetInnerHTML={{ __html: `${creature.actions}` }}></section>
        </section>
      </If>

      <If predicate={!!creature.reactions}>
        <section class="ct-base pwa-3">
          <h4>Reactions</h4>
          <section dangerouslySetInnerHTML={{ __html: `${creature.reactions}` }}></section>
        </section>
      </If>

      <footer class="fld-row jc-spb fs-d1">
        <strong>
          CR {creature.rating} ({creature.experience} XP)
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
