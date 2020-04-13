import { spells } from "./spells";
import { Level, Class, School, Source, State } from "./models";

export const Levels: Level[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

export const Classes: Class[] = [
  "Bard",
  "Cleric",
  "Druid",
  "Paladin",
  "Ranger",
  "Ritual",
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

export const Sources: Source[] = ["PHB", "EBB"];

export const INITIAL_STATE: State = {
  spells: spells,
  book: [],
  filters: {
    source: Sources,
    class: ["Bard"],
    school: Schools,
    level: Levels,
    search: "",
  },
  sort: {},
};
