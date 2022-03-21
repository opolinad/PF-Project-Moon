import { configureStore, combineReducers } from "@reduxjs/toolkit";
import loginReducer from "./reducers/loginSlice";
import registerReducer from "./reducers/registerSlice"
import userReducer from "./reducers/userSlice"
import postReducer from "./reducers/postSlice";
import searchReducer from "./reducers/navBarSlice";
import {feedReducer, categoriesReducer, selectedCategoryReducer, filterAndOrderReducer} from "./reducers/homeSlice"
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key: "root",
    version: 1,
    storage,
};

const rootReducer = combineReducers({ user: loginReducer, register: registerReducer, feed:feedReducer, categories:categoriesReducer, selectedCategory:selectedCategoryReducer, filterAndOrder: filterAndOrderReducer, userData: userReducer, search: searchReducer});
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export let persistor = persistStore(store);
