import { FC, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks";
import { authRoutes, mainRoutes } from "../routes";
import { AuthActionCreators } from "../store/asyncActions/AuthActionCreators";
import ErrorAlert from "./ErrorAlert";
import Loader from "./Loader";

const AppRouter: FC = () => {
  const { isAuth, isLoading, error } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(AuthActionCreators.checkAuth());
  }, []);

  if (isLoading) {
    return <Loader description="Загрузка..." />;
  }

  return (
    <>
      {error ? <ErrorAlert description={error} /> : null}
      {isAuth ? (
        <Routes>
          {mainRoutes.map((route) => {
            return <Route key={route.path} {...route} />;
          })}
        </Routes>
      ) : (
        <Routes>
          {authRoutes.map((route) => {
            return <Route key={route.path} {...route} />;
          })}
        </Routes>
      )}
    </>
  );
};

export default AppRouter;
