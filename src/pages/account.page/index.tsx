import AppHeight from "@components/AppHeight";
import { Route, Routes } from "react-router-dom";
import LazyComponent from "@components/LazyComponent";
import { lazy } from "react";
import NotFound from "../NotFound";
import Sidebar from "./components/Sidebar";
import { c } from "@utils";

const AccountRoutes: React.FC = () => {
  return (
    <AppHeight>
      <div className={c`h-full w-full flex border-t-2 dark:border-slate-600`}>
        <Sidebar />
        <Routes>
          <Route path="/" element={<LazyComponent component={lazy(() => import("./account"))} />} />
          <Route path="/messenger" element={<LazyComponent component={lazy(() => import("./messenger.page"))} />} />
          <Route path="/settings" element={<LazyComponent component={lazy(() => import("./settings.page"))} />} />
          <Route path="/sales" element={<h1>My Sales</h1>} />
          <Route path="/new_listing" element={<LazyComponent component={lazy(() => import("./listProduct.page"))} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </AppHeight>
  );
};

export default AccountRoutes;
