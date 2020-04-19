import { Spell, Level } from "~/store";
import { ordinal } from "./numbers";

export const toSpellLevel = (level: Level): string => {
  if (level === 0) {
    return "Cantrip";
  }
  return `${ordinal(level)} Level`;
};

export const toSpellType = (s: Spell): string => {
  const level = toSpellLevel(s.level);
  if (s.level === 0) {
    return `${level} Cantrip`;
  }
  return `${level} ${s.school}`;
};

export const toSpellComponents = (s: Spell): string => {
  const components: string[] = [];
  s.components.verbal && components.push("V");
  s.components.somatic && components.push("S");
  s.components.material && components.push("M");
  return components.join(", ");
};
