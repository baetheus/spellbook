import { Spell } from "~/store";
import { ordinal } from "./numbers";

export const toSpellType = (s: Spell): string => {
  if (s.level === 0) {
    return `${s.school} Cantrip`;
  }
  return `${ordinal(s.level)} Level ${s.school}`;
};

export const toSpellComponents = (s: Spell): string => {
  const components: string[] = [];
  s.components.verbal && components.push("V");
  s.components.somatic && components.push("S");
  s.components.material && components.push("M");
  return components.join(", ");
};
