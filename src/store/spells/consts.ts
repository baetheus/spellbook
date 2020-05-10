import {
  Level,
  Class,
  School,
  Source,
  State,
  Sort,
  Spell,
  SpellSort,
  ShowSpellCount,
} from "./models";
import { toComparison } from "~/libraries/numbers";
import { initial } from "@nll/datum/Datum";

export const Levels: Level[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

export const Classes: Class[] = [
  "Artificer",
  "Bard",
  "Cleric",
  "Druid",
  "Paladin",
  "Ranger",
  "Sorcerer",
  "Warlock",
  "Wizard",
];

export const Schools: School[] = [
  "Abjuration",
  "Conjuration",
  "Divination",
  "Enchantment",
  "Evocation",
  "Illusion",
  "Necromancy",
  "Transmutation",
];

export const Sources: Source[] = ["PHB", "XAN", "WLD"];

export const SpellCounts: ShowSpellCount[] = [25, 50, 100, "All"];

export const SpellSorts: SpellSort[] = ["Level", "Name"];

export const INITIAL_STATE: State = {
  spells: initial,
  book: new Set(),
  filters: {
    source: Sources,
    class: Classes,
    level: Levels,
    search: "",
  },
  sort: "Level",
  showSpellCount: 25,
};

export const sortByName: Sort<Spell> = (a, b) => toComparison(a.name.localeCompare(b.name));
export const sortByLevel: Sort<Spell> = (a, b) => toComparison(a.level - b.level);

export const toSpellSort = (sortBy: SpellSort): Sort<Spell> => {
  switch (sortBy) {
    case "Name":
      return sortByName;
    case "Level":
      return sortByLevel;
  }
};

export const STORAGE_KEY = "SPELL_STATE";
