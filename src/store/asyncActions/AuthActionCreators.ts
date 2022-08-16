import { AppDispatch } from "..";
import { UsersAPI } from "../../api/users";
import { authSlice } from "../slices/authSlice";

export const AuthActionCreators = {
  login: (email: string, password: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(authSlice.actions.setLoading(true));
      // На реальном проекте проверка почты и пароля (хешированного) проводится на стороне сервера
      const users = await UsersAPI.getAll();
      const user = users.find(
        (user) => user.email === email && user.password === password
      );
      if (user) {
        dispatch(authSlice.actions.setAuth(true));
        dispatch(authSlice.actions.setUser(user));
        window.localStorage.setItem("isAuth", "true");
        window.localStorage.setItem(
          "user",
          JSON.stringify({ id: user.id, name: user.name, email: user.email })
        );
      } else {
        dispatch(authSlice.actions.setError("Неправильный логин или пароль"));
      }
    } catch (e: unknown) {
      dispatch(
        authSlice.actions.setError("Непридвиденная ошибка. Повторите ещё раз")
      );
    }
  },

  logout: () => (dispatch: AppDispatch) => {
    dispatch(authSlice.actions.setAuth(false));
    dispatch(authSlice.actions.setUser({ id: 0, email: "", name: "" }));
    window.localStorage.clear();
  },

  checkAuth: () => (dispatch: AppDispatch) => {
    // На реальном проекте идет запрос на сервер о проверке авторизации
    const isAuth = window.localStorage.getItem("isAuth");
    const user = window.localStorage.getItem("user");
    if (isAuth && user) {
      dispatch(authSlice.actions.setAuth(true));
      dispatch(authSlice.actions.setUser(JSON.parse(user)));
    }
  },
};
