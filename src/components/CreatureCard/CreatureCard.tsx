import "./CreatureCard.scss";

import { h, FunctionalComponent } from "preact";
import { If } from "../Control";

interface CreatureCardProps {
  fixed?: boolean;
  className?: string;
  theme?: string;
  creature?: Creature;
}

type CreatureSource =
  | "Monster Manual"
  | "Players Handbook"
  | "Dungeon Masters Guide"
  | "Explorers Guide to Wildemount"
  | "Custom";

interface Creature {
  name: string;
  type: string;
  rating: number;
  experience: number;
  ac: number;
  armor?: string;
  hp: number;
  speed: string;
  str: number;
  dex: number;
  con: number;
  int: number;
  wis: number;
  cha: number;
  features: string;
  traits: string;
  actions?: string;
  reactions?: string;
  source: CreatureSource;
  page?: number;
}

const assassin: Creature = {
  name: "Assassin",
  type: "Medium humanoid (any race), any non-good alignment",
  rating: 8,
  experience: 3900,
  ac: 15,
  armor: "studded leather",
  hp: 78,
  speed: "30 ft",
  str: 0,
  dex: 3,
  con: 2,
  int: 1,
  wis: 0,
  cha: 0,
  features:
    "<p><strong>Saving Throws: </strong>Dex +6, Int +4</p><p><strong>Skills: </strong>Acrobatics +6, Deception +3, Perception +3, Stealth +9</p><p><strong>Damage Resistances: </strong>Poison</p><p><strong>Senses: </strong>Passive Perception 13</p><p><strong>Languages: </strong>Thieves Cant + 2 Others</p>",
  traits:
    "<p><em>Assassinate. </em>During its first turn the assassin has advantage on attack rolls against any creature that hasn't taken a turn. Any hit the assassin scores against a surprised creature is a critical hit.</p><p><em>Evasion. </em>If the assassin is subjected to an effect that allows it to make a Dexterity saving throw to take only half damage, the assassin instead takes no damage if it succeeds and only half if it fails.</p><p><em>Sneak Attack. </em>Once per turn the assassin deals an extra 14(4d6) damage when it hits a target with a weapon attack and has advantage on the attack, or when the target is within 5 feet of an ally that isn't incapacitated and the assassin doesn't have advantage.</p>",
  actions:
    "<p><strong>Multiattack. </strong>The assassin makes two shortsword attacks</p><p><strong>Shortsword. </strong>+6, 5ft., 6(1d6+3) piercing damage. Target must make a DC15 CON save, taking 24(7d6) poison damage upon a failed save, or half as much on a success</p><p><strong>Light Crossbow. </strong>+6, 80/320ft., 7(1d8+3) piercing damage. Target must make a DC15 CON save, taking 24(7d6) poison damage upon a failed save, or half as much on a success</p>",
  source: "Monster Manual",
  page: 343,
};

export const CreatureCard: FunctionalComponent<CreatureCardProps> = ({
  fixed = false,
  className = "",
  theme = "ct-dark",
  creature = assassin,
}) => {
  return (
    <article
      tabIndex={0}
      aria-label={`Creature Card - ${creature.name}`}
      class={`${
        fixed ? "fixed-card fs-d2" : "unfixed-card"
      } creature-card pwx-4 pwt-4 pwb-2 bra-1 fld-col flg-2 ${className} ${theme}`}
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
