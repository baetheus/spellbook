import * as t from "io-ts";

const Class = t.keyof({
  Barbarian: null,
  Bard: null,
  Cleric: null,
  Druid: null,
  Fighter: null,
  Monk: null,
  Paladin: null,
  Ranger: null,
  Rogue: null,
  Sorcerer: null,
  Warlock: null,
  Wizard: null,
  Artificer: null,
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

const Spell = t.type({
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

export const StateCodec = t.type({
  book: t.readonlyArray(Spell),
  filters: t.type({
    source: t.readonlyArray(Source),
    class: t.readonlyArray(Class),
    school: t.readonlyArray(School),
    level: t.readonlyArray(Level),
    search: t.string,
  }),
});
export type StateCodec = t.TypeOf<typeof StateCodec>;
