import Button, { ButtonColor } from "@components/Button";
import { c } from "@utils";
import styles from "./resultsBar.module.less";
import { ChevronDoubleRightIcon } from "@heroicons/react/24/solid";
import { useRecoilState } from "recoil";
import { resultsSidebarSlice } from "@atoms/resultsBar";

export default function ResultsBar() {
  const [sidebarState, setSidebarState] = useRecoilState(resultsSidebarSlice);
  const { opened } = sidebarState;

  return (
    <>
      <div
        className={c`
          absolute
          h-full
          w-full
          bg-[#ffffff41]
          backdrop:filter
          backdrop-blur-md
          -right-1/2
          z-10
          transition-transform
          will-change-transform
          ${opened ? styles.open : styles.closed}
        `}
      ></div>
      <span
        className={c`
          z-10
          absolute
          top-1/2
          transition-transform
          will-change-transform
          origin-center
          ${opened ? styles.iconOpen : styles.iconClosed}
        `}
      >
        <Button
          buttonColor={ButtonColor.Blue}
          aria-label="Open or close results"
          onClick={() => setSidebarState({ ...sidebarState, opened: !opened })}
        >
          <span
            className={c`
              flex
              w-full
              h-full
              justify-center
              items-center
            `}
          >
            <ChevronDoubleRightIcon
              aria-details="Open or close the results from the map"
              className={c`w-5 h-5 transition-transform`}
            />
            {!opened && <p>Results</p>}
          </span>
        </Button>
      </span>
    </>
  );
}
