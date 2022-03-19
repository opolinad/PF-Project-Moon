import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from "./reducers/index.js";
import Actions from "./actions/index.js";
import thunk from "redux-thunk";



const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
);

console.log(rootReducer)
console.log(Actions)
export default store;