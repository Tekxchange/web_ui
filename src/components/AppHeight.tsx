import { c } from "@utils";

interface AppHeightProps extends React.PropsWithChildren {}

export default function AppHeight({ children }: AppHeightProps) {
  return (
    <section
      className={c`app-height with-footer flex justify-center items-center
        w-full relative overflow-x-hidden`}
    >
      {children}
    </section>
  );
}
