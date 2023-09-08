import { useAppDispatch } from "@state/index";
import { deleteHistory } from "@state/router";
import useRerouter from "@utils/useRerouter";
import { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";

export default function NotFound() {
  const rerouteUrl = useRerouter();
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();

  useEffect(() => {
    dispatch(deleteHistory(pathname));
  }, []);

  return <Navigate to={rerouteUrl} />;
}
