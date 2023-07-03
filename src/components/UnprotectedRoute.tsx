import { useAppDispatch } from "@state/index";
import { addHistory } from "@state/router";
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

type UnprotectedRouteProps<Props extends object> = {
  redirectTo?: string;
  render: React.FC<Props>;
} & Props;

/**
 * Protects a route behind auth, redirecting to either a custom redirect point
 * or the last unprotected route in the router history
 */
function UnprotectedRoute<P extends object>({
  redirectTo,
  render: Render,
  ...rest
}: UnprotectedRouteProps<P>) {
  const dispatch = useAppDispatch();
  const { pathname, search } = useLocation();

  useEffect(() => {
    dispatch(addHistory({ pathname, protected: false, search }));
  }, [pathname, search]);

  const childProps = rest as P;

  return (
    <>
      <Render {...childProps} />
    </>
  );
}

export default UnprotectedRoute;
