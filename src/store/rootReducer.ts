import { combineReducers } from "@reduxjs/toolkit";
import { authReducer, usersReducer } from "./slices";

export default combineReducers({
  auth: authReducer,
  users: usersReducer,
});
