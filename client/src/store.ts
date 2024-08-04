import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./slices";

const devTools =
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__();

const store = configureStore({
  reducer: rootReducer,
  devTools: devTools,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
