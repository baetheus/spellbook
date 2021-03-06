import { DatumEither } from "@nll/datum/DatumEither";

/**
 * Spell Types
 */
export type Level = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export type Class =
  | "Bard"
  | "Cleric"
  | "Druid"
  | "Paladin"
  | "Ranger"
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

export type Source = "PHB" | "XAN" | "WLD";

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
export type Spells = ReadonlyArray<Spell>;

export type SpellSort = "Name" | "Level";

/**
 * Sort Types
 */
export type Comparison = -1 | 0 | 1;
export type Sort<T> = (a: T, b: T) => Comparison;

/**
 * Show Spells Counts
 */
export type ShowSpellCount = 25 | 50 | 100 | "All";

/**
 * State
 */
export type State = {
  spells: DatumEither<Error, Spells>;
  book: Set<string>;
  focus?: Spell;
  filters: {
    source: Source[];
    class: Class[];
    level: Level[];
    search: string;
  };
  sort: SpellSort;
  showSpellCount: ShowSpellCount;
};
