import { useEffect, useState, useCallback } from "preact/hooks";
import { createStore } from "@nll/dux/Store";
import { actionCreatorFactory } from "@nll/dux/Actions";
import { useStoreFactory, useDispatchFactory } from "@nll/dux/React";
import { caseFn } from "@nll/dux/Reducers";
import { Lens } from "monocle-ts";
import { createSelector } from "reselect";
import { EMPTY } from "rxjs";
import { tap, mergeMapTo, skip } from "rxjs/operators";

import { isIn, intersects, toggleIn, notNil } from "~/libraries/fns";
import { logger } from "~/libraries/dux";

import { State, Spell, Source, Class, School, Level, Sort } from "./models";
import { INITIAL_STATE } from "./consts";
import { restoreState, trySetState } from "./restoreState";
import { StateCodec } from "./validators";

// Action Creators
const creator = actionCreatorFactory("SPELLS");

// Lenses
const rootProp = Lens.fromProp<State>();
export const spellsL = rootProp("spells");
export const bookL = rootProp("book");
export const filtersL = rootProp("filters");
export const focusL = rootProp("focus");

const rootProps = Lens.fromPath<State>();
export const sourceL = rootProps(["filters", "source"]);
export const classL = rootProps(["filters", "class"]);
export const schoolL = rootProps(["filters", "school"]);
export const levelL = rootProps(["filters", "level"]);
export const searchL = rootProps(["filters", "search"]);
export const sortSpellsL = rootProps(["sort", "spells"]);
export const sortBookL = rootProps(["sort", "book"]);

/**
 * Add / Remove spells from book
 */
export const toggleSpell = creator.simple<Spell>("TOGGLE_SPELL");
const toggleSpellCase = caseFn(toggleSpell, (s: State, { value }) =>
  bookL.modify(toggleIn(value))(s)
);

/**
 * Filters
 * - Toggle Sources, Classes, Schools, Levels shown
 * - Filter on search phrase
 */
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
 * Reset Filters
 */
export const resetFilters = creator.simple("RESET_FILTERS");
const resetFilterCase = caseFn(
  resetFilters,
  (s: State): State => ({
    ...s,
    filters: INITIAL_STATE.filters,
  })
);

/**
 * Sorts
 */
export const sortSpells = creator.simple<Sort<Spell> | undefined>("SORT_SPELLS");
const sortSpellsCase = caseFn(sortSpells, (s: State, { value }) => sortSpellsL.set(value)(s));

export const sortBook = creator.simple<Sort<Spell> | undefined>("SORT_BOOK");
const sortBookCase = caseFn(sortBook, (s: State, { value }) => sortBookL.set(value)(s));

/**
 * Focus a Spell
 */
export const focusSpell = creator.simple<Spell>("FOCUS_SPELL");
const focusSpellCase = caseFn(focusSpell, (s: State, { value }) => focusL.set(value)(s));

/**
 * Recover State
 */
export const recoverState = creator.simple<StateCodec>("RECOVER_STATE");
const recoverStateCase = caseFn(recoverState, (s: State, { value }) => ({
  spells: s.spells,
  sort: s.sort,
  book: value.book.map((bs) => s.spells.find((ss) => ss.name === bs.name)).filter(notNil),
  filters: value.filters,
}));

/**
 * Select Spells Filtered by Filters
 */
export const selectBook = createSelector(bookL.get, sortBookL.get, (books, sort) =>
  [...books].sort(sort)
);
export const selectSpells = createSelector(
  spellsL.get,
  sourceL.get,
  classL.get,
  schoolL.get,
  levelL.get,
  bookL.get,
  searchL.get,
  sortSpellsL.get,
  (spells, sources, classes, schools, levels, book, search, sort) =>
    spells
      .filter(
        (s) =>
          isIn(sources)(s.source) && // Spell source must be in selected sources
          intersects(classes)(s.class) && // Spell classes must intersect selected classes
          isIn(schools)(s.school) && // Spell school must be in selected schools
          isIn(levels)(s.level) && // Spell level must be in selected levels
          !isIn(book)(s) && // Spell must not be in the book already
          s.name.toLowerCase().includes(search.toLowerCase()) // Spell must contain the search phrase
      )
      .sort(sort)
);
export const selectBrowseSpells = createSelector(spellsL.get, searchL.get, (spells, search) =>
  spells.filter((s) => s.name.toLowerCase().includes(search.toLowerCase()))
);

/**
 * Wireup Store
 */
export const store = createStore(INITIAL_STATE)
  .addMetaReducers(logger())
  .addReducers(
    toggleSpellCase,
    toggleSourceCase,
    toggleClassCase,
    toggleSchoolCase,
    toggleLevelCase,
    searchCase,
    resetFilterCase,
    sortSpellsCase,
    sortBookCase,
    recoverStateCase,
    focusSpellCase
  )
  .addRunOnces(restoreState)
  .addRunOnces((_, s) => s.pipe(skip(1), tap(trySetState), mergeMapTo(EMPTY)));

export const useStore = useStoreFactory(store, useState, useEffect);
export const useDispatch = useDispatchFactory(store, useCallback);
