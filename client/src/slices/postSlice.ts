// import { createSlice } from "@reduxjs/toolkit";
// import { RootState } from "../types";

// const postSlice = createSlice({
//   name: "post",
//   initialState: {
//     isAuthenticated: false,
//     token: null,
//     user: {
//       id: null,
//       name: null,
//       email: null,
//     },
//   },
//   reducers: {
//       login: (state, action) => {

//           switch (action.type) {
//             case LOGIN_REQUEST:
//               return { ...state, loading: true, error: null };
//             case LOGIN_SUCCESS:
//               return { ...state, loading: false, user: action.payload };
//             case LOGIN_FAILURE:
//               return { ...state, loading: false, user: null, error: action.error };
//             default:
//               return state;
//           }

//       state.isAuthenticated = action.payload.isAuthenticated;
//       state.token = action.payload.token;
//       state.user = {
//         id: action.payload.user._id,
//         name: action.payload.user.name,
//         email: action.payload.user.email,
//       };
//     },
//     logout: (state, action) => {
//       state.isAuthenticated = false;
//       state.user = action.payload;
//     },
//   },
// });

// export const { login, logout } = postSlice.actions;
// export default postSlice.reducer;
