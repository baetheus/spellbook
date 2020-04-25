import * as t from "io-ts";
import { setFromArray } from "io-ts-types/lib/setFromArray";
import { ordString } from "fp-ts/lib/Ord";

const Class = t.keyof({
  Artificer: null,
  Bard: null,
  Cleric: null,
  Druid: null,
  Paladin: null,
  Ranger: null,
  Sorcerer: null,
  Warlock: null,
  Wizard: null,
});

const School = t.keyof({
  Abjuration: null,
  Conjuration: null,
  Divination: null,
  Enchantment: null,
  Evocation: null,
  Illusion: null,
  Necromancy: null,
  Transmutation: null,
});

const Level = t.union([
  t.literal(0),
  t.literal(1),
  t.literal(2),
  t.literal(3),
  t.literal(4),
  t.literal(5),
  t.literal(6),
  t.literal(7),
  t.literal(8),
  t.literal(9),
]);

const Components = t.type({
  verbal: t.boolean,
  somatic: t.boolean,
  material: t.boolean,
  materials: t.array(t.string),
});

const Source = t.keyof({
  PHB: null,
  XAN: null,
  WLD: null,
});

export const Spell = t.type({
  name: t.string,
  description: t.string,
  range: t.string,
  ritual: t.boolean,
  duration: t.string,
  concentration: t.boolean,
  casting_time: t.string,
  level: Level,
  school: School,
  class: t.array(Class),
  components: Components,
  source: Source,
  page: t.number,
});

const SpellSort = t.keyof({
  Name: null,
  Level: null,
});

const ShowSpellCount = t.union([t.literal(25), t.literal(50), t.literal(100), t.literal("All")]);

export const StateCodec = t.type({
  book: setFromArray(t.string, ordString),
  filters: t.type({
    source: t.readonlyArray(Source),
    class: t.readonlyArray(Class),
    level: t.readonlyArray(Level),
    search: t.string,
  }),
  sort: SpellSort,
  showSpellCount: ShowSpellCount,
});
export type StateCodec = t.TypeOf<typeof StateCodec>;
