import AppHeight from "@components/AppHeight";
import { Route, Routes } from "react-router-dom";
import LazyComponent from "@components/LazyComponent";
import { lazy } from "react";
import NotFound from "../NotFound";

const AccountRoutes: React.FC = () => {
  return (
    <AppHeight>
      <Routes>
        <Route path="/" element={<LazyComponent component={lazy(() => import("./account"))} />} />
        <Route path="/messenger" element={<LazyComponent component={lazy(() => import("./messenger.page"))} />} />
        <Route path="/settings" element={<LazyComponent component={lazy(() => import("./settings.page"))} />} />
        <Route path="/new_listing" element={<LazyComponent component={lazy(() => import("./listProduct.page"))} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AppHeight>
  );
};

export default AccountRoutes;
