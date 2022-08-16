import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../interfaces/IUser";

export interface UsersState {
  users: IUser[];
  selectedUser: IUser | null;
  isLoading: boolean;
  error: string;
}

const initialState: UsersState = {
  users: [],
  selectedUser: null,
  isLoading: false,
  error: "",
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
      state.error = "";
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    setUsers: (state, action: PayloadAction<IUser[]>) => {
      state.users = action.payload;
    },
    selectUser: (state, action: PayloadAction<IUser | null>) => {
      state.selectedUser = action.payload;
    },
    addUser: (state, action: PayloadAction<IUser>) => {
      state.users.push(action.payload);
    },
    updateUser: (state, action: PayloadAction<IUser>) => {
      state.users = state.users.map((user) =>
        user.id === action.payload.id ? action.payload : user
      );
    },
    deleteUser: (state, action: PayloadAction<{ id: number }>) => {
      state.users = state.users.filter((user) => user.id !== action.payload.id);
    },
  },
});

export const {
  addUser,
  deleteUser,
  setUsers,
  updateUser,
  selectUser,
  setError,
  setLoading,
} = usersSlice.actions;

export default usersSlice.reducer;
