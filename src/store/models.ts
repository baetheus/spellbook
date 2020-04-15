/**
 * Spell Types
 */
export type Level = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export type Class =
  | "Barbarian"
  | "Bard"
  | "Cleric"
  | "Druid"
  | "Fighter"
  | "Monk"
  | "Paladin"
  | "Ranger"
  | "Rogue"
  | "Sorcerer"
  | "Warlock"
  | "Wizard"
  | "Artificer";

export type School =
  | "Abjuration"
  | "Conjuration"
  | "Divination"
  | "Enchantment"
  | "Evocation"
  | "Illusion"
  | "Necromancy"
  | "Transmutation";

export type Source = "PHB" | "EBB";

export type Components = {
  verbal: boolean;
  somatic: boolean;
  material: boolean;
  materials: string[];
};

export type Spell = {
  name: string;
  description: string;
  range: string;
  ritual: boolean;
  duration: string;
  concentration: boolean;
  casting_time: string;
  level: Level;
  school: School;
  class: Class[];
  components: Components;
  source: Source;
  page: number;
};

/**
 * Sort Types
 */
export type Comparison = -1 | 0 | 1;
export type Sort<T> = (a: T, b: T) => Comparison;

/**
 * State
 */
export type State = {
  spells: ReadonlyArray<Spell>;
  book: ReadonlyArray<Spell>;
  focus?: Spell;
  filters: {
    source: ReadonlyArray<Source>;
    class: ReadonlyArray<Class>;
    school: ReadonlyArray<School>;
    level: ReadonlyArray<Level>;
    search: string;
  };
  sort: {
    spells?: Sort<Spell>;
    book?: Sort<Spell>;
  };
};