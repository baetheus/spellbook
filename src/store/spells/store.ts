import { useEffect, useState } from "preact/hooks";
import { createStore } from "@nll/dux/Store";
import { actionCreatorFactory } from "@nll/dux/Actions";
import { useStoreFactory } from "@nll/dux/React";
import { Spell, spells, Class, Source, School, Level } from "./spells";
import { caseFn } from "@nll/dux/Reducers";
import { Lens } from "monocle-ts";
import { createSelector } from "reselect";
import { isIn, intersects, toggleIn } from "~/libraries/fns";

type State = {
  spells: Spell[];
  book: Spell[];
  source: Source[];
  class: Class[];
  school: School[];
  level: Level[];
  search: string;
};
const INITIAL_STATE: State = {
  spells: spells,
  book: [],
  source: ["PHB", "EE PC", "SCAG", "EBB", "UA TOBM"],
  class: [
    "Sorcerer",
    "Wizard",
    "Druid",
    "Ranger",
    "Cleric",
    "Paladin",
    "Bard",
    "Ritual Caster",
    "Warlock",
  ],
  school: [
    "Conjuration",
    "Necromancy",
    "Evocation",
    "Abjuration",
    "Transmutation",
    "Divination",
    "Enchantment",
    "Illusion",
  ],
  level: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  search: "",
};

// Action Creators
const creator = actionCreatorFactory("SPELLS");

// Lenses
const rootLens = Lens.fromProp<State>();
export const spellsL = rootLens("spells");
export const bookL = rootLens("book");
export const sourceL = rootLens("source");
export const classL = rootLens("class");
export const schoolL = rootLens("school");
export const levelL = rootLens("level");
export const searchL = rootLens("search");

/**
 * Select/Deselect Spells
 */
export const toggleSpell = creator.simple<Spell>("TOGGLE_SPELL");
const toggleSpellCase = caseFn(toggleSpell, (s: State, { value }) =>
  bookL.modify(toggleIn(value))(s)
);

export const toggleSource = creator.simple<Source>("TOGGLE_SOURCE");
const toggleSourceCase = caseFn(toggleSource, (s: State, { value }) =>
  sourceL.modify(toggleIn(value))(s)
);

export const toggleClass = creator.simple<Class>("TOGGLE_CLASS");
const toggleClassCase = caseFn(toggleClass, (s: State, { value }) =>
  classL.modify(toggleIn(value))(s)
);

export const toggleSchool = creator.simple<School>("TOGGLE_SCHOOL");
const toggleSchoolCase = caseFn(toggleSchool, (s: State, { value }) =>
  schoolL.modify(toggleIn(value))(s)
);

export const toggleLevel = creator.simple<Level>("TOGGLE_LEVEL");
const toggleLevelCase = caseFn(toggleLevel, (s: State, { value }) =>
  levelL.modify(toggleIn(value))(s)
);

export const search = creator.simple<string>("SEARCH");
const searchCase = caseFn(search, (s: State, { value }) => searchL.set(value)(s));

/**
 * Selectors
 */
export const selectSpells = createSelector(
  spellsL.get,
  sourceL.get,
  classL.get,
  schoolL.get,
  levelL.get,
  searchL.get,
  (spells, sources, classes, schools, levels, search) =>
    spells.filter(
      (s) =>
        isIn(sources)(s.source) &&
        intersects(classes)(s.class) &&
        isIn(schools)(s.school) &&
        isIn(levels)(s.level) &&
        s.name.toLowerCase().includes(search.toLowerCase())
    )
);

/**
 * Wireup Store
 */
export const store = createStore(INITIAL_STATE).addReducers(
  toggleSpellCase,
  toggleSourceCase,
  toggleClassCase,
  toggleSchoolCase,
  toggleLevelCase,
  searchCase
);
export const useSpells = useStoreFactory(store, useState, useEffect);
