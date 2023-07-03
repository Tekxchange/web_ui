import AppHeight from "@components/AppHeight";
import { Route, Routes } from "react-router-dom";
import AccountPage from "./account";
import MessengerPage from "./messenger.page";
import SettingsPage from "./settings.page";
import { WithAuth } from "@components/ProtectedRoute";

const AccountRoutes: React.FC<WithAuth> = ({ user }) => {
  return (
    <AppHeight>
      <Routes>
        <Route path="/" element={<AccountPage user={user} />} />
        <Route path="/messenger" element={<MessengerPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
    </AppHeight>
  );
};

export default AccountRoutes;
