import { AuthState } from "./auth";
import { GlobalState } from "./global";

export interface RootState {
  auth: AuthState;
  global: GlobalState;
}
