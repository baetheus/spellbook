import { MetaReducer } from "@nll/dux/Store";
import { TypedAction } from "@nll/dux/Actions";

type ErrorAction = TypedAction & { error: boolean };

const isErrorAction = (a: TypedAction): a is ErrorAction =>
  a.hasOwnProperty("error") && typeof (<any>a).error === "boolean" && (<ErrorAction>a).error;

export const logger = <S>(): MetaReducer<S> => (reducer) => {
  return (state, action) => {
    const _state = reducer(state, action);
    console.groupCollapsed(action.type);
    if (isErrorAction(action)) {
      console.error("Error Action", action);
    } else {
      console.log("Action", action);
    }
    console.log("State Before", state);
    console.log("State After", _state);
    console.groupEnd();
    return _state;
  };
};
