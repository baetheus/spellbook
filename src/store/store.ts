import { useEffect, useState, useCallback } from "preact/hooks";
import { createStore } from "@nll/dux/Store";
import { actionCreatorFactory } from "@nll/dux/Actions";
import { useStoreFactory, useDispatchFactory } from "@nll/dux/React";
import { caseFn } from "@nll/dux/Reducers";
import { Lens } from "monocle-ts";
import { EMPTY } from "rxjs";
import { tap, mergeMapTo, skip } from "rxjs/operators";

import { isIn, intersects, toggleIn } from "~/libraries/fns";
import { toggleIn as setToggleIn } from "~/libraries/sets";
import { logger } from "~/libraries/dux";

import { State, Spell, Source, Class, Level, SpellSort, ShowSpellCount } from "./models";
import { INITIAL_STATE, toSpellSort } from "./consts";
import { restoreState, trySetState } from "./restoreState";
import { StateCodec } from "./validators";

// Action Creators
const creator = actionCreatorFactory("SPELLS");

// Lenses
const rootProps = Lens.fromPath<State>();
export const spellsL = rootProps(["spells"]);
export const bookL = rootProps(["book"]);
export const filtersL = rootProps(["filters"]);
export const focusL = rootProps(["focus"]);
export const sortL = rootProps(["sort"]);
export const showSpellCountL = rootProps(["showSpellCount"]);

export const sourceL = rootProps(["filters", "source"]);
export const classL = rootProps(["filters", "class"]);
export const levelL = rootProps(["filters", "level"]);
export const searchL = rootProps(["filters", "search"]);

/**
 * Add / Remove spells from book
 * Clear book
 */
export const toggleSpell = creator.simple<Spell>("TOGGLE_SPELL");
const toggleSpellCase = caseFn(toggleSpell, (s: State, { value }) =>
  bookL.modify(setToggleIn(value.name))(s)
);
export const clearBook = creator.simple("CLEAR_BOOK");
const clearBookCase = caseFn(
  clearBook,
  bookL.modify((set) => {
    set.clear();
    return set;
  })
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
export const setSpellSort = creator.simple<SpellSort>("SORT_SPELLS");
const setSpellSortCase = caseFn(setSpellSort, (s: State, { value }) => sortL.set(value)(s));

/**
 * Spell Count
 */
export const setSpellCount = creator.simple<ShowSpellCount>("SET_SPELL_COUNT");
const setSpellCountCase = caseFn(setSpellCount, (s: State, { value }) =>
  showSpellCountL.set(value)(s)
);

/**
 * Recover State
 */
export const errorRecoveringState = creator.simple<string>("RECOVER_STATE_ERROR", {}, true);
export const recoverState = creator.simple<StateCodec>("RECOVER_STATE");
const recoverStateCase = caseFn(recoverState, (s: State, { value }) => ({
  ...s,
  ...value,
}));

/**
 * Select Spells Filtered by Filters
 */
export const selectBook = bookL.get;
export const selectSpells = (state: State) =>
  state.spells
    .filter(
      (s) =>
        state.book.has(s.name) ||
        (isIn(state.filters.source)(s.source) && // Spell source must be in selected sources
        intersects(state.filters.class)(s.class) && // Spell classes must intersect selected classes
        isIn(state.filters.level)(s.level) && // Spell level must be in selected levels
          s.name.toLowerCase().includes(state.filters.search.toLowerCase())) // Spell must contain the search phrase
    )
    .sort(toSpellSort(state.sort)); // Sort by sort type

/**
 * Wireup Store
 */
export const store = createStore(INITIAL_STATE)
  .addMetaReducers(logger())
  .addReducers(
    toggleSpellCase,
    clearBookCase,
    toggleSourceCase,
    toggleClassCase,
    toggleLevelCase,
    setSpellCountCase,
    searchCase,
    resetFilterCase,
    setSpellSortCase,
    recoverStateCase
  )
  .addRunOnces(restoreState)
  .addRunOnces((_, s) => s.pipe(skip(1), tap(trySetState), mergeMapTo(EMPTY)));

export const useStore = useStoreFactory(store, useState, useEffect);
export const useDispatch = useDispatchFactory(store, useCallback);
