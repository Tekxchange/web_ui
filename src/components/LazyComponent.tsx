/* eslint-disable @typescript-eslint/no-explicit-any */
import { LazyExoticComponent } from "react";
import Loading from "./Loading";
import React from "react";

type Props<P extends object> = {
  component: LazyExoticComponent<React.FC<P>>;
  fallback?: JSX.Element;
} & P;

export default function LazyComponent<P extends object>(props: Props<P>) {
  const { component: Component, fallback, ...componentProps } = props;

  return (
    <React.Suspense fallback={fallback ?? <Loading />}>
      <Component {...(componentProps as any)} />
    </React.Suspense>
  );
}
