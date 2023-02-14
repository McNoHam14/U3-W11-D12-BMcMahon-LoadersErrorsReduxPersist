import { combineReducers, configureStore } from "@reduxjs/toolkit";
import favouriteReducer from "../reducers/favouriteReducer";
import jobReducer from "../reducers/jobReducer";
import { partialStore, partialReducer } from "redux-persist";
import localStorage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";

const store = configureStore({
  reducer: combineReducers({
    favouriteReducer: favouriteReducer,
    jobReducer: jobReducer,
  }),
});

const persistConfig = {
  storage: localStorage,
  key: "root",
};

const combinedReducers = combineReducers({});

const persistedReducer = persistReducer(persistConfig, store);

// const store = configureStore({ reducer: persistedReducer });

const persistedStore = persistStore(store);

export default store;
