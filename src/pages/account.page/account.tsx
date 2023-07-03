import { useProtectedAuth } from "@components/ProtectedRoute";

const AccountPage: React.FC = () => {
  const user = useProtectedAuth();
  return (
    <>
      <h1>Welcome, {user.username}</h1>
    </>
  );
};

export default AccountPage;
