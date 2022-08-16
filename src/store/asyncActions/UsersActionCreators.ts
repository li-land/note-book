import { AppDispatch } from "..";
import { UsersAPI } from "../../api/users";
import { IUser } from "../../interfaces/IUser";
import { usersSlice } from "../slices/usersSlice";

export const UsersActionCreators = {
  fetchUsers: () => async (dispatch: AppDispatch) => {
    try {
      dispatch(usersSlice.actions.setLoading(true));
      const users = await UsersAPI.getAll();
      const currentUser = window.localStorage.getItem("user");
      if (currentUser) {
        const usersWithoutMe = users.filter(
          (user) => user.id !== JSON.parse(currentUser).id
        );
        dispatch(usersSlice.actions.setUsers(usersWithoutMe));
        return usersWithoutMe;
      }
    } catch (e: unknown) {
      dispatch(
        usersSlice.actions.setError("Произошла ошибка при загрузке контактов")
      );
    } finally {
      dispatch(usersSlice.actions.setLoading(false));
    }
  },

  addUser: (email: string, name: string) => async (dispatch: AppDispatch) => {
    try {
      const user = await UsersAPI.add(email, name);
      dispatch(usersSlice.actions.addUser(user));
    } catch (e: unknown) {
      dispatch(
        usersSlice.actions.setError("Произошла ошибка при добавлении контакта")
      );
    }
  },

  updateUser: (user: IUser) => async (dispatch: AppDispatch) => {
    try {
      await UsersAPI.update(user);
      dispatch(usersSlice.actions.updateUser(user));
    } catch (e: unknown) {
      dispatch(
        usersSlice.actions.setError("Произошла ошибка при обновлении контакта")
      );
    }
  },

  deleteUser: (id: number) => async (dispatch: AppDispatch) => {
    try {
      await UsersAPI.delete(id.toString());
      dispatch(usersSlice.actions.deleteUser({ id }));
    } catch (e: unknown) {
      dispatch(
        usersSlice.actions.setError("Произошла ошибка при удалении контакта")
      );
    }
  },
};
