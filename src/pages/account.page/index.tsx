import AppHeight from "@components/AppHeight";
import { Route, Routes } from "react-router-dom";
import AccountPage from "./account";
import MessengerPage from "./messenger.page";
import SettingsPage from "./settings.page";

const AccountRoutes: React.FC = () => {
  return (
    <AppHeight>
      <Routes>
        <Route path="/" element={<AccountPage />} />
        <Route path="/messenger" element={<MessengerPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
    </AppHeight>
  );
};

export default AccountRoutes;
