import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers/index.js";
import Actions from "./actions/index.js";
import thunk from "redux-thunk";

const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
);

console.log(rootReducer)
console.log(Actions)
export default store;