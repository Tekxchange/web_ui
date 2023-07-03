import { c } from "@utils";

interface AppHeightProps extends React.PropsWithChildren {}

const AppHeight: React.FC<AppHeightProps> = ({ children }) => {
  return (
    <section
      className={c`app-height with-footer flex justify-center items-center
        w-full relative overflow-x-hidden`}
    >
      {children}
    </section>
  );
};

export default AppHeight;
