import { configureStore } from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";
// import storage from "redux-persist/lib/storage";
import rootReducer from "./slices";
// const persistConfig = {
//   key: "root",
//   storage,
// };

// const persistedReducer = persistReducer(persistConfig, rootReducer);
const devTools =
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__();

const store = configureStore({
  reducer: rootReducer,
  devTools: devTools,
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware({
  //     serializableCheck: false,
  //   }),
});

// const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
// export { store, persistor };
