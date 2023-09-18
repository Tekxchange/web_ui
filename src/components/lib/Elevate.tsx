import { c } from "@utils";
import React, { useMemo } from "react";

export enum Elevation {
  Default,
  High,
  Higher,
  Highest,
}

const elevationToClassname: Record<Elevation, string> = {
  [Elevation.Default]: c`dark:bg-zinc-900 bg-slate-100`,
  [Elevation.High]: c`dark:bg-zinc-800 bg-slate-200`,
  [Elevation.Higher]: c`dark:bg-zinc-700 bg-slate-300`,
  [Elevation.Highest]: c`dark:bg-zinc-600 bg-slate-400`,
};

type Props = React.PropsWithChildren<{
  elevation?: Elevation;
}>;

export default function Elevate(props: Props) {
  const children = useMemo(() => {
    const elevation = props.elevation ?? Elevation.Default;

    return React.Children.map(props.children, (child) => {
      if (React.isValidElement(child)) {
        let className = (child.props["className"] as string) ?? "";
        className = c`${className} ${elevationToClassname[elevation]}`;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return React.cloneElement<any>(child, { className });
      }
      return child;
    });
  }, [props.children, props.elevation]);

  return <>{children}</>;
}
