import { useAppSelector } from "@state/index";
import React from "react";
import { Navigate } from "react-router-dom";
import FullPageLoading from "./FullPageLoading";
import { UserInfo } from "@api/userApi";
import { Some } from "@utils/option";

export type WithAuth<T extends object = {}> = T & {
  readonly user: Some<UserInfo>;
};

interface ProtectedRouteProps extends React.PropsWithChildren {
  redirectTo?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  redirectTo,
  children: vanillaChildren,
}) => {
  const { user, loading } = useAppSelector((state) => state.auth);

  if (loading && !user.isSome) {
    return <FullPageLoading />;
  }

  if (!user.isSome) {
    return <Navigate to={redirectTo || "/"} />;
  }

  const children = React.Children.map(vanillaChildren, (child) => {
    if (!React.isValidElement(child)) return child;
    return React.cloneElement(child as React.ReactElement<WithAuth>, { user });
  });

  return <>{children}</>;
};

export default ProtectedRoute;
