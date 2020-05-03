import { useState, useEffect, useCallback } from "preact/hooks";
import { Lens } from "monocle-ts";
import { useStoreFactory, useDispatchFactory } from "@nll/dux/React";
import { asyncReducerFactory, caseFn } from "@nll/dux/Reducers";
import { actionCreatorFactory } from "@nll/dux/Actions";
import { asyncExhaustMap } from "@nll/dux/Operators";
import { createStore } from "@nll/dux/Store";
import * as DE from "@nll/datum/DatumEither";
import { map } from "rxjs/operators";
import { ajax } from "rxjs/ajax";

import { mapDecode } from "~/libraries/ajax";
import { toggleIn } from "~/libraries/sets";
import { logger } from "~/libraries/dux";

import {
  INITIAL_CREATURES_STATE,
  NLL_API_URL,
  Creature,
  CreaturesWithIds,
  CreaturesRes,
} from "./consts";
import { State } from "./models";
import { pipe } from "fp-ts/es6/pipeable";

const creator = actionCreatorFactory("CREATURES");

/**
 * Lenses
 */
const rootProp = Lens.fromProp<State>();
export const creaturesL = rootProp("creatures");
export const selectedL = rootProp("selected");
export const searchL = rootProp("search");

/**
 * Store
 */
export const creatureStore = createStore(INITIAL_CREATURES_STATE);
export const useCreatureStore = useStoreFactory(creatureStore, useState, useEffect);
export const useCreatureDispatch = useDispatchFactory(creatureStore, useCallback);

creatureStore.addMetaReducers(logger());

/**
 * Load Creatures
 */
export const loadCreatures = creator.async<void, CreaturesWithIds, Error>("LOAD_CREATURES");
const loadCreaturesReducer = asyncReducerFactory(loadCreatures, creaturesL);
const loadCreaturesRunOnes = asyncExhaustMap(loadCreatures, () =>
  ajax.getJSON([NLL_API_URL, "spellbook", "creatures"].join("/")).pipe(
    mapDecode(CreaturesRes),
    map(({ creatures }) => creatures)
  )
);
creatureStore.addReducers(loadCreaturesReducer).addRunOnces(loadCreaturesRunOnes);

/**
 * Toggle Creature Selection
 * Clear Selected
 */
export const toggleCreature = creator.simple<Creature>("TOGGLE_CREATURE");
const toggleSpellCase = caseFn(toggleCreature, (s: State, { value }) => {
  toggleIn(value.name)(s.selected);
  return { ...s };
});
export const clearSelected = creator.simple("CLEAR_SELECTED");
const clearSelectedCase = caseFn(
  clearSelected,
  selectedL.modify((set) => {
    set.clear();
    return set;
  })
);
creatureStore.addReducers(toggleSpellCase, clearSelectedCase);

/**
 * Search Creatures
 */
export const searchCreatures = creator.simple<string>("SEARCH_CREATURES");
const searchCreaturesCase = caseFn(searchCreatures, (s: State, { value }) => searchL.set(value)(s));
creatureStore.addReducers(searchCreaturesCase);

/**
 * Selectors
 */
export const selectCreatures = (s: State) => s.creatures;
export const selectCreature = (id: string) => (s: State) =>
  pipe(
    s.creatures,
    DE.chain((cs) => DE.fromNullable(cs.find((c) => c.id === id)))
  );

/**
 * Initialization
 */
creatureStore.dispatch(loadCreatures.pending());
