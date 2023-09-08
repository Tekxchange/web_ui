/* eslint-disable @typescript-eslint/no-explicit-any */
import { LazyExoticComponent } from "react";
import Loading from "./Loading";
import React from "react";

type Props<P extends object> = {
  component: LazyExoticComponent<React.FC<P>>;
  fallback?: JSX.Element;
} & P;

/**
 * Easy to use lazy loaded component.
 * @example
 * ```tsx
 * <LazyComponent component={React.lazy(() => import("./myModule"))} myModuleProp="Hello World!" />
 * ```
 * @param props The component to render, plus the props for the component
 * which will be spread onto the component when it is mounted
 */
export default function LazyComponent<P extends object>(props: Props<P>) {
  const { component: Component, fallback, ...componentProps } = props;

  return (
    <React.Suspense fallback={fallback ?? <Loading />}>
      <Component {...(componentProps as any)} />
    </React.Suspense>
  );
}
