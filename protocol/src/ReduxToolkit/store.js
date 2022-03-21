import { configureStore, combineReducers } from "@reduxjs/toolkit";
import loginReducer from "./reducers/loginSlice";
import registerReducer from "./reducers/registerSlice"
<<<<<<< HEAD
import { feedReducer, categoriesReducer, selectedCategoryReducer, filterAndOrderReducer } from "./reducers/homeSlice"
=======
import userReducer from "./reducers/userSlice"
import {feedReducer, categoriesReducer, selectedCategoryReducer, filterAndOrderReducer} from "./reducers/homeSlice"
>>>>>>> 3a9435c941279714a50d364b0b721d980cf8b3a1
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

<<<<<<< HEAD
const rootReducer = combineReducers({ user: loginReducer, register: registerReducer, feed: feedReducer, categories: categoriesReducer, selectedCategory: selectedCategoryReducer, filterAndOrder: filterAndOrderReducer });
=======
const rootReducer = combineReducers({ user: loginReducer, register: registerReducer, feed:feedReducer, categories:categoriesReducer, selectedCategory:selectedCategoryReducer, filterAndOrder: filterAndOrderReducer, userData: userReducer});
>>>>>>> 3a9435c941279714a50d364b0b721d980cf8b3a1

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
