import { useAppDispatch, useAppSelector } from "@state/index";
import React, { createContext, useContext, useEffect, useMemo } from "react";
import { Navigate, useLocation } from "react-router-dom";
import FullPageLoading from "./FullPageLoading";
import { UserInfo } from "@api/userApi";
import { Some } from "@utils/option";
import { addHistory } from "@state/router";

const AuthContext = createContext<Some<UserInfo>>(undefined!);

/**
 * A protected hook which will always return a UserInfo object as long as the route is listed as protected via
 * `<ProtectedRoute />`
 * @returns The currently logged in user
 */
export function useProtectedAuth(): UserInfo {
  const { value } = useContext(AuthContext);

  return value;
}

type ProtectedRouteProps<Props extends object> = {
  redirectTo?: string;
  protect: React.FC<Props>;
} & Props;

/**
 * Protects a route behind auth, redirecting to either a custom redirect point
 * or the last unprotected route in the router history
 */
function ProtectedRoute<P extends object>({
  redirectTo,
  protect: Protected,
  ...rest
}: ProtectedRouteProps<P>) {
  const { user, loading } = useAppSelector((state) => state.auth);
  const { routerHistory } = useAppSelector((state) => state.router);

  const builtHistoryFallback = useMemo(() => {
    const history = routerHistory.find((h) => !h.protected);
    if (history) {
      return `${history.pathname}${history.search}`;
    }
    return "/";
  }, [routerHistory]);

  const dispatch = useAppDispatch();
  const { pathname, search } = useLocation();

  useEffect(() => {
    if (!user.isSome || loading) return;
    dispatch(addHistory({ pathname, protected: true, search }));
  }, [pathname, search, loading, user]);

  const childProps = rest as P;

  if (loading && !user.isSome) {
    return <FullPageLoading />;
  }

  if (!user.isSome) {
    return <Navigate to={redirectTo || builtHistoryFallback} />;
  }

  return (
    <>
      <AuthContext.Provider value={user}>
        <Protected user={user} {...childProps} />
      </AuthContext.Provider>
    </>
  );
}

export default ProtectedRoute;
