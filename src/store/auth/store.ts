import { useState, useEffect, useCallback } from "preact/hooks";
import { Lens } from "monocle-ts";
import { Option, none, some } from "fp-ts/es6/Option";
import { pipe } from "fp-ts/es6/pipeable";
import { from } from "rxjs";
import { actionCreatorFactory } from "@nll/dux/Actions";
import { asyncReducerFactory, caseFn } from "@nll/dux/Reducers";
import { asyncExhaustMap } from "@nll/dux/Operators";
import { DatumEither, initial, isSuccess, chain } from "@nll/datum/DatumEither";
import createAuth0Client, {
  IdToken,
  PopupLoginOptions,
  RedirectLoginResult,
  RedirectLoginOptions,
  Auth0ClientOptions,
  Auth0Client,
  PopupConfigOptions,
} from "@auth0/auth0-spa-js";
import { createStore, filterEvery } from "@nll/dux/Store";
import { useStoreFactory, useDispatchFactory } from "@nll/dux/React";

import { logger } from "~/libraries/dux";

/**
 * Models
 */
export interface Auth0User extends Omit<IdToken, "__raw"> {}

export interface AuthState {
  options: Option<Auth0ClientOptions>;
  client: DatumEither<Error, Auth0Client>;
  user: DatumEither<Error, Auth0User>;
}

export interface LoginProps {
  options?: PopupLoginOptions;
  config?: PopupConfigOptions;
}

/**
 * Consts
 */
const INITIAL_AUTH_STATE: AuthState = { options: none, client: initial, user: initial };
const creator = actionCreatorFactory("AUTH");

/**
 * Lenses
 */
const rootProps = Lens.fromProp<AuthState>();
const userL = rootProps("user");
const clientL = rootProps("client");
const optionsL = rootProps("options");

/**
 * Get User
 */
export const getUser = creator.async<void, Auth0User, Error>("GET_USER");
const getUserReducer = asyncReducerFactory(getUser, userL);
const getUserRunEvery = filterEvery(getUser.pending, async (s: AuthState, _) => {
  if (!isSuccess(s.client)) {
    return getUser.failure({ params: undefined, error: new Error("Client is not initilized.") });
  }
  const client = s.client.value.right;
  const authed = await client.isAuthenticated();
  if (authed) {
    const result = await client.getUser();
    return getUser.success({ params: undefined, result });
  }
  return getUser.failure({ params: undefined, error: new Error("User is not authenticated.") });
});

/**
 * Create Client
 */
export const createClient = creator.async<Auth0ClientOptions, Auth0Client, Error>("CREATE_CLIENT");
const createClientSaveCase = caseFn(createClient.pending, (s: AuthState, { value }) =>
  optionsL.set(some(value))(s)
);
const createClientReducer = asyncReducerFactory(createClient, clientL);
const createClientRunOnce = asyncExhaustMap(createClient, (params) =>
  from(createAuth0Client(params))
);

/**
 * Handle Redirect Callback
 */
export const redirectCallback = creator.async<string | undefined, RedirectLoginResult, Error>(
  "REDIRECT"
);
const redirectCallbackRunEvery = filterEvery(redirectCallback.pending, async (s: AuthState, a) => {
  if (!isSuccess(s.client)) {
    return redirectCallback.failure({
      params: undefined,
      error: new Error("Client is not initilized."),
    });
  }
  const client = s.client.value.right;
  const result = await client.handleRedirectCallback(a.value);
  return redirectCallback.success({ params: a.value, result });
});

/**
 * Chain from createClient.success
 */
const clientToRedirectCallback = filterEvery(createClient.success, async () => {
  if (window.location.search.includes("code=") && window.location.search.includes("state=")) {
    return redirectCallback.pending(undefined);
  }
});
const getUserAfterClientSuccess = filterEvery(createClient.success, async () => {
  return getUser.pending();
});
const getUserAfterRedirectSuccess = filterEvery(redirectCallback.success, () => getUser.pending());

/**
 * Login with Popup
 */
export const loginWithPop = creator.async<LoginProps, void, Error>("LOGIN_WITH_POPUP");
const loginWithPopRunEvery = filterEvery(loginWithPop.pending, async (s: AuthState, { value }) => {
  if (!isSuccess(s.client)) {
    return getUser.failure({ params: undefined, error: new Error("Client is not initilized.") });
  }
  const client = s.client.value.right;

  try {
    await client.loginWithPopup(value.options, value.config);
  } catch (error) {
    return loginWithPop.failure({ params: value, error });
  }

  return loginWithPop.success({ params: value, result: undefined });
});
const getUserAfterLoginSuccess = filterEvery(loginWithPop.success, () => getUser.pending());

/**
 * Login with Redirect
 */
export const loginWithRedirect = creator.async<RedirectLoginOptions, void, Error>(
  "LOGIN_WITH_REDIRECT"
);
const loginWithRedirectRunEvery = filterEvery(
  loginWithRedirect.pending,
  async (s: AuthState, { value }) => {
    console.log("Hiya");
    if (!isSuccess(s.client)) {
      return getUser.failure({ params: undefined, error: new Error("Client is not initilized.") });
    }
    const client = s.client.value.right;

    try {
      await client.loginWithRedirect(value);
    } catch (error) {
      return loginWithRedirect.failure({ params: value, error });
    }

    return loginWithRedirect.success({ params: value, result: undefined });
  }
);

export const logout = creator.async<string>("LOGOUT");
const logoutResetCase = caseFn(logout.success, () => INITIAL_AUTH_STATE);
const logoutRunEvery = filterEvery(logout.pending, async (s: AuthState, { value }) => {
  if (!isSuccess(s.client)) {
    return getUser.failure({ params: undefined, error: new Error("Client is not initilized.") });
  }
  const client = s.client.value.right;
  await client.logout({ returnTo: value });
  return logout.success({ params: value, result: null });
});

/**
 * Selectors
 */

export const selectUser = (s: AuthState) =>
  pipe(
    s.client,
    chain(() => s.user)
  );

/**
 * Create Store
 */
export const authStore = createStore(INITIAL_AUTH_STATE)
  .addMetaReducers(logger())
  .addReducers(getUserReducer, createClientSaveCase, createClientReducer, logoutResetCase)
  .addRunEverys(
    getUserRunEvery,
    redirectCallbackRunEvery,
    clientToRedirectCallback,
    getUserAfterClientSuccess,
    loginWithPopRunEvery,
    loginWithRedirectRunEvery,
    getUserAfterLoginSuccess,
    logoutRunEvery,
    getUserAfterRedirectSuccess
  )
  .addRunOnces(createClientRunOnce);
export const useAuthStore = useStoreFactory(authStore, useState, useEffect);
export const useAuthDispatch = useDispatchFactory(authStore, useCallback);
