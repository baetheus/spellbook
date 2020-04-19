import { spells } from "./spells";
import { Level, Class, School, Source, State, Sort, Spell, SpellSort } from "./models";
import { toComparison } from "~/libraries/numbers";

export const Levels: ReadonlyArray<Level> = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

export const Classes: ReadonlyArray<Class> = [
  "Bard",
  "Cleric",
  "Druid",
  "Paladin",
  "Ranger",
  "Sorcerer",
  "Warlock",
  "Wizard",
  "Artificer",
];

export const Schools: ReadonlyArray<School> = [
  "Abjuration",
  "Conjuration",
  "Divination",
  "Enchantment",
  "Evocation",
  "Illusion",
  "Necromancy",
  "Transmutation",
];

export const Sources: ReadonlyArray<Source> = ["PHB", "XAN", "WLD"];

export const INITIAL_STATE: State = {
  spells: spells,
  book: [],
  filters: {
    source: Sources,
    class: Classes,
    school: Schools,
    level: Levels,
    search: "",
  },
  sort: "Level",
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
