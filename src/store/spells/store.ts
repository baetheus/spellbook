import { useEffect, useState, useCallback } from "preact/hooks";
import { createStore, RunOnce } from "@nll/dux/Store";
import { actionCreatorFactory } from "@nll/dux/Actions";
import { asyncReducerFactory } from "@nll/dux/Reducers";
import { asyncExhaustMap } from "@nll/dux/Operators";
import { useStoreFactory, useDispatchFactory } from "@nll/dux/React";
import { map } from "@nll/datum/DatumEither";
import { caseFn } from "@nll/dux/Reducers";
import { Lens } from "monocle-ts";
import { ajax } from "rxjs/ajax";

import { isIn, intersects, toggleIn } from "~/libraries/fns";
import { toggleIn as setToggleIn } from "~/libraries/sets";
import { logger } from "~/libraries/dux";

import { State, Spell, Source, Class, Level, SpellSort, ShowSpellCount, Spells } from "./models";
import { INITIAL_STATE, toSpellSort, STORAGE_KEY } from "./consts";
import { StateCodec, Spells as SpellsCodec } from "./validators";
import { mapDecode } from "~/libraries/ajax";
import { pipe } from "fp-ts/es6/pipeable";
import { createStateRestore } from "~/libraries/restoreState";

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
 * Load Spells
 */
export const loadSpells = creator.async<void, Spells, Error>("LOAD_SPELLS");
const loadSpellsReducer = asyncReducerFactory(loadSpells, spellsL);
const loadSpellsRunOnce: RunOnce<State> = asyncExhaustMap(loadSpells, () =>
  ajax.getJSON("/spells.json").pipe(mapDecode(SpellsCodec))
);

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
 * Select Spells Filtered by Filters
 */
export const selectBook = bookL.get;

const spellFilter = (state: State) => (spell: Spell) =>
  isIn(state.filters.source)(spell.source) && // Spell source must be in selected sources
  isIn(state.filters.level)(spell.level) && // Spell level must be in selected levels
  intersects(state.filters.class)(spell.class) && // Spell classes must intersect selected classes
  spell.name.toLowerCase().includes(state.filters.search.toLowerCase()); // Spell must contain the search phrase

export const selectSpells = (state: State) =>
  pipe(
    state.spells,
    map((spells) => spells.filter(spellFilter(state)).sort(toSpellSort(state.sort)))
  );

/**
 * Wireup Store
 */
export const store = createStore(INITIAL_STATE)
  .addMetaReducers(logger())
  .addReducers(
    searchCase,
    toggleSpellCase,
    clearBookCase,
    toggleSourceCase,
    toggleClassCase,
    toggleLevelCase,
    setSpellCountCase,
    setSpellSortCase,
    resetFilterCase,
    loadSpellsReducer
  )
  .addRunOnces(loadSpellsRunOnce);

/**
 * Store state in localstorage, recover on load
 */
const { wireup } = createStateRestore<StateCodec, State>(StateCodec, STORAGE_KEY);
wireup(store, 30 * 1000);

// Load Spells!
store.dispatch(loadSpells.pending());

export const useStore = useStoreFactory(store, useState, useEffect);
export const useDispatch = useDispatchFactory(store, useCallback);
