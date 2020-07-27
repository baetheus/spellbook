import { useState, useEffect, useCallback } from "preact/hooks";
import { Lens } from "monocle-ts";
import { useStoreFactory, useDispatchFactory } from "@nll/dux/React";
import { asyncReducerFactory, caseFn, asyncEntityFactory } from "@nll/dux/Reducers";
import { actionCreatorFactory } from "@nll/dux/Actions";
import { asyncExhaustMap, asyncSwitchMap } from "@nll/dux/Operators";
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
  Creatures,
  CreaturesRes,
  creatureIdLens,
  NewCreature,
  CreatureStateCodec,
  CREATURE_STORAGE_KEY,
} from "./consts";
import { State } from "./models";
import { pipe } from "fp-ts/es6/pipeable";
import { initial } from "@nll/datum/Datum";
import { createStateRestore } from "~/libraries/restoreState";

const creator = actionCreatorFactory("CREATURES");

/**
 * Lenses
 */
const rootProp = Lens.fromProp<State>();
export const creaturesL = rootProp("creatures");
export const editCreaturesL = rootProp("edits");
export const createCreatureL = rootProp("create");
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
export const loadCreatures = creator.async<void, Creatures, Error>("LOAD_CREATURES");
const loadCreaturesReducer = asyncReducerFactory(loadCreatures, creaturesL);
const loadCreaturesRunOnce = asyncExhaustMap(loadCreatures, () =>
  ajax.getJSON(`${NLL_API_URL}/spellbook/creatures`).pipe(
    mapDecode(CreaturesRes),
    map(({ creatures }) => creatures)
  )
);
creatureStore.addReducers(loadCreaturesReducer).addRunOnces(loadCreaturesRunOnce);

/**
 * Post Creature
 */
export const postCreature = creator.async<NewCreature, Creature, Error>("POST_CREATURE");
const postCreatureReducer = asyncReducerFactory(postCreature, createCreatureL);
const postCreatureRunOnce = asyncExhaustMap(postCreature, (body) =>
  ajax({
    url: `${NLL_API_URL}/spellbook/creatures`,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  }).pipe(
    map((res) => res.response),
    mapDecode(Creature)
  )
);
const updateCreatureOnPostSuccess = caseFn(
  postCreature.success,
  (s: State, { value: { result } }) =>
    creaturesL.modify((de) => DE.map((cs: Creatures) => cs.concat(result))(de))(s)
);
creatureStore
  .addReducers(postCreatureReducer, updateCreatureOnPostSuccess)
  .addRunOnces(postCreatureRunOnce);

/**
 * Clear Posted Creature
 */
export const clearCreateCreature = creator.simple("CLEAR_CREATE_CREATURE");
const clearCreateCreatureCase = caseFn(clearCreateCreature, createCreatureL.set(initial));
creatureStore.addReducers(clearCreateCreatureCase);

/**
 * Put Creature
 */
export const putCreature = creator.async<Creature, Creature, Error>("PUT_CREATURE");
const putCreatureReducer = asyncEntityFactory(putCreature, editCreaturesL, creatureIdLens);
const updateCreatureOnPutSuccess = caseFn(putCreature.success, (s: State, { value: { result } }) =>
  creaturesL.modify((de) =>
    DE.map((cs: Creatures) => cs.map((c) => (c.id === result.id ? result : c)))(de)
  )(s)
);

const putCreatureRunOnce = asyncSwitchMap(putCreature, (body) =>
  ajax({
    url: `${NLL_API_URL}/spellbook/creatures/${body.id}`,
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  }).pipe(
    map((res) => res.response),
    mapDecode(Creature)
  )
);

creatureStore
  .addReducers(putCreatureReducer, updateCreatureOnPutSuccess)
  .addRunOnces(putCreatureRunOnce);

/**
 * Toggle Creature Selection
 */
export const toggleCreature = creator.simple<Creature>("TOGGLE_CREATURE");
const toggleSpellCase = caseFn(toggleCreature, (s: State, { value }) => {
  toggleIn(value.name)(s.selected);
  return { ...s };
});

/**
 * Clear Creature Selections
 */
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
 * Store Creature State in LocalStorage every 5 seconds
 */
const { wireup } = createStateRestore<CreatureStateCodec, State>(
  CreatureStateCodec,
  CREATURE_STORAGE_KEY
);
wireup(creatureStore, 30 * 1000);

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
