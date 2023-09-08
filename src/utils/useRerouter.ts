import { useAppSelector } from "@state/index";

/**
 * Redux hook to get the last page visited (taking protected route protection into account)
 * @returns The built URL (query params included)
 */
export default function useRerouter(): string {
  const { routerHistory } = useAppSelector((state) => state.router);
  const { user } = useAppSelector((state) => state.auth);

  if (user.isSome) {
    let foundHistory = routerHistory.find((history) => history.protected);
    if (!foundHistory) foundHistory = routerHistory[0] ?? { pathname: "/", protected: false, search: "" };

    return `${foundHistory.pathname}${foundHistory.search}`;
  }

  let foundHistory = routerHistory.find((history) => !history.protected);
  if (!foundHistory) foundHistory = { pathname: "/", protected: false, search: "" };

  return `${foundHistory.pathname}${foundHistory.search}`;
}
