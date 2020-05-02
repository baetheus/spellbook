import { Creature, State } from "./models";
import { initial } from "@nll/datum/DatumEither";

export const creatures: Creature[] = [
  {
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
  },
];

export const INITIAL_CREATURES_STATE: State = {
  creatures: initial,
  selected: new Set(),
  search: "",
};
