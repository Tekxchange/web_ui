import { useMemo } from "react";
import { useLocation } from "react-router-dom";

export default function useQueryParams(): Record<string, string> {
  const { search } = useLocation();

  return useMemo(() => {
    const toReturn: Record<string, string> = {};
    const builtParams = new URLSearchParams(search);

    for (const param of builtParams) {
      toReturn[param[0]] = param[1];
    }

    return toReturn;
  }, [search]);
}
