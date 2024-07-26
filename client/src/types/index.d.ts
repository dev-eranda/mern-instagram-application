import { AuthState } from "./auth";
import { PostState } from "./post";
import { GlobalState } from "./global";

export interface RootState {
  auth: AuthState;
  post: PostState;
  global: GlobalState;
}
