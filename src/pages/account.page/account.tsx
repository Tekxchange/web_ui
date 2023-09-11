import { useProtectedAuth } from "@components/ProtectedRoute";
import { useEffect } from "react";

const AccountPage: React.FC = () => {
  const user = useProtectedAuth();
  useEffect(() => {
    document.title = "Tekxchange - Account";
  }, []);
  return (
    <>
      <h1>Welcome, {user.username}</h1>
    </>
  );
};

export default AccountPage;
