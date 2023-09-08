/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { Ref } from "react";
import { c } from "@utils";
import type { Cog6ToothIcon } from "@heroicons/react/20/solid";
import { NavLink } from "react-router-dom";

export enum IconPosition {
  Left,
  Right,
}

interface IButtonProps
  extends Omit<
    React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>,
    "ref" | "children" | "className"
  > {
  link?: false | undefined;
  innerRef?: Ref<HTMLButtonElement>;
}

interface IAnchorProps
  extends Omit<
    React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>,
    "ref" | "children" | "className"
  > {
  link: true;
  innerRef?: Ref<HTMLAnchorElement>;
}

export type MenuItemProps = (IButtonProps | IAnchorProps) & {
  buttonText: string;
  icon?: typeof Cog6ToothIcon;
  iconPosition?: IconPosition;
  link?: boolean;
};

const MenuItem: React.FC<MenuItemProps> = ({ innerRef, link, iconPosition: propsIconPosition, ...props }) => {
  const iconPosition = propsIconPosition || IconPosition.Left;
  const { buttonText, icon, ...elementProps } = props;
  const innerMenuItemProps = { buttonText, icon, iconPosition };

  return (
    <>
      {link ? (
        <NavLink
          ref={innerRef}
          to={(elementProps as any).href}
          className={c`hover:bg-slate-800 dark:hover:bg-slate-600 min-w-full h-full px-2 py-1
            hover:text-white
            active:shadow-lg-inner active:shadow-gray-400 transition-colors w-max flex justify-between items-center`}
          {...(elementProps as any)}
        >
          <InnerMenuItems {...innerMenuItemProps} />
        </NavLink>
      ) : (
        <button
          ref={innerRef}
          className={c`hover:bg-slate-800 dark:hover:bg-slate-600 min-w-full h-full px-2 py-1
            hover:text-white
            active:shadow-lg-inner active:shadow-gray-400 transition-colors w-max flex justify-between items-center`}
          {...(elementProps as any)}
        >
          <InnerMenuItems {...innerMenuItemProps} />
        </button>
      )}
    </>
  );
};

const InnerMenuItems: React.FC<Pick<MenuItemProps, "buttonText" | "iconPosition" | "icon">> = ({
  buttonText,
  icon: Icon,
  iconPosition,
}) => {
  return (
    <>
      {iconPosition === IconPosition.Left && Icon && <Icon className={c`w-5 h-5 inline mr-5`} />}
      {buttonText}
      {iconPosition === IconPosition.Right && Icon && <Icon className={c`w-5 h-5 inline ml-5`} />}
    </>
  );
};

export default MenuItem;
