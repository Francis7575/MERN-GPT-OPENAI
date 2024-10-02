import { lazy } from "react";
import { IRouterType } from '../types/types';
import { createBrowserRouter } from 'react-router-dom';

const Signup = lazy(() => import("../pages/Signup"));
const Login = lazy(() => import("../pages/Login"));
const Home = lazy(() => import("../pages/Home"));
const Chat = lazy(() => import("../pages/Chat"));
const Layout = lazy(() => import("../components/shared/Layout"));

const routes: IRouterType[] = [
  {
    title: "Layout",
    element: <Layout />,
    children: [
      {
        title: "Home",
        path: "/",
        element: <Home />,
      },
      {
        title: "Login",
        path: "/login",
        element: <Login />,
      },
      {
        title: "Signup",
        path: "/signup",
        element: <Signup />,
      },
      {
        title: "Chat",
        path: "/chat",
        element: <Chat />,
      },
    ]
  }
]

export const PAGE_DATA: ReturnType<typeof createBrowserRouter> = createBrowserRouter(routes);