import AppHeight from "@components/AppHeight";
import { Route, Routes } from "react-router-dom";
import LazyComponent from "@components/LazyComponent";
import { lazy } from "react";
import NotFound from "../NotFound";
import Sidebar from "./components/Sidebar";
import { c } from "@utils";

const routes = [
  {
    path: "/",
    component: () => import("./account"),
  },
  {
    path: "/messenger",
    component: () => import("./messenger.page"),
  },
  {
    path: "/settings",
    component: () => import("./settings.page"),
  },
  {
    path: "/sales/:id?",
    component: () => import("./sales.page"),
  },
  {
    path: "/new_listing",
    component: () => import("./listProduct.page"),
  },
] as const;

const AccountRoutes: React.FC = () => {
  return (
    <AppHeight>
      <div className={c`h-full w-full flex border-t-2 dark:border-zinc-600`}>
        <Sidebar />
        <Routes>
          {routes.map((route) => (
            <Route path={route.path} element={<LazyComponent component={lazy(route.component)} />} key={route.path} />
          ))}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </AppHeight>
  );
};

export default AccountRoutes;
