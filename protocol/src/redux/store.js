import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./reducers/index";
import ReduxThunks from "redux-thunk";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistConfig = {
    key: 'root',
    version: 1,
    storage
}

const persistedReducer = persistReducer(persistConfig, rootReducer)
let store = createStore(persistedReducer, composeEnhancers(applyMiddleware(ReduxThunks)));

let persistor = persistStore(store)

export { store, persistor }