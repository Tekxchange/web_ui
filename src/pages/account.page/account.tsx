import { WithAuth } from "@components/ProtectedRoute";

const AccountPage: React.FC<WithAuth> = ({ user }) => {
  return (
    <>
      <h1>Welcome, {user.value.username}</h1>
    </>
  );
};

export default AccountPage;
