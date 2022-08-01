import { combineReducers, createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import auth from "./auth/reducer.js";
import task from "./task/reducer.js";
import user from "./user/reducer.js";

export const reducer = combineReducers({
  auth,
  task,
  user
});

export const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export * from "./auth/action.js";
export * from "./task/action.js";
export * from "./user/action.js";
