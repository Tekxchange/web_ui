import { useAppSelector } from "@state/index";
import React from "react";
import { Navigate } from "react-router-dom";
import FullPageLoading from "./FullPageLoading";
import { UserInfo } from "@api/userApi";
import { Some } from "@utils/option";

export type WithAuth<T extends object = {}> = T & {
  readonly user: Some<UserInfo>;
};

interface ProtectedRouteProps<Props extends object> {
  redirectTo?: string;
  protectedElement: React.FC<WithAuth<Props>>;
  childProps: Props;
}

function ProtectedRoute<P extends object>({
  redirectTo,
  protectedElement: Protected,
  childProps,
}: ProtectedRouteProps<P>) {
  const { user, loading } = useAppSelector((state) => state.auth);

  if (loading && !user.isSome) {
    return <FullPageLoading />;
  }

  if (!user.isSome) {
    return <Navigate to={redirectTo || "/"} />;
  }

  return (
    <>
      <Protected user={user} {...childProps} />
    </>
  );
}

export default ProtectedRoute;
