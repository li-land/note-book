import { Navigate } from "react-router-dom";
import { ReactElement } from "react";
import AuthPage from "../pages/AuthPage";
import MainPage from "../pages/MainPage";

export interface IRoute {
  path: string;
  element: ReactElement;
}

export enum RouteNames {
  MAIN = "/",
  AUTH = "/auth",
  NOT_FOUND = "*",
}

export const authRoutes: IRoute[] = [
  { path: RouteNames.AUTH, element: <AuthPage /> },
  {
    path: RouteNames.NOT_FOUND,
    element: <Navigate to={RouteNames.AUTH} />,
  },
];

export const mainRoutes: IRoute[] = [
  { path: RouteNames.MAIN, element: <MainPage /> },
  {
    path: RouteNames.NOT_FOUND,
    element: <Navigate to={RouteNames.MAIN} />,
  },
];
