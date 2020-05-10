import * as C from "io-ts/es6/Codec";
import { setFromStringArray } from "~/libraries/sets";

const Class = C.literal(
  "Artificer",
  "Bard",
  "Cleric",
  "Druid",
  "Paladin",
  "Ranger",
  "Sorcerer",
  "Warlock",
  "Wizard"
);

const School = C.literal(
  "Abjuration",
  "Conjuration",
  "Divination",
  "Enchantment",
  "Evocation",
  "Illusion",
  "Necromancy",
  "Transmutation"
);

const Level = C.literal(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);

const Components = C.type({
  verbal: C.boolean,
  somatic: C.boolean,
  material: C.boolean,
  materials: C.array(C.string),
});

const Source = C.literal("PHB", "XAN", "WLD");

export const Spell = C.type({
  name: C.string,
  description: C.string,
  range: C.string,
  ritual: C.boolean,
  duration: C.string,
  concentration: C.boolean,
  casting_time: C.string,
  level: Level,
  school: School,
  class: C.array(Class),
  components: Components,
  source: Source,
  page: C.number,
});

export const Spells = C.array(Spell);

const SpellSort = C.literal("Name", "Level");

const ShowSpellCount = C.literal(25, 50, 100, "All");

export const StateCodec = C.type({
  book: setFromStringArray,
  filters: C.type({
    source: C.array(Source),
    class: C.array(Class),
    level: C.array(Level),
    search: C.string,
  }),
  sort: SpellSort,
  showSpellCount: ShowSpellCount,
});
export type StateCodec = C.TypeOf<typeof StateCodec>;
