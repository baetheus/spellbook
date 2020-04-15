import { Spell } from "~/store";
import { ordinal } from "./numbers";

export const toSpellType = (s: Spell): string => {
  if (s.level === 0) {
    return `${s.school} Cantrip`;
  }
  return `${ordinal(s.level)} Level ${s.school}`;
};
