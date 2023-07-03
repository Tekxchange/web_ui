import Button, { ButtonColor } from "@components/Button";
import { c } from "@utils";
import styles from "./resultsBar.module.less";
import { ChevronDoubleRightIcon } from "@heroicons/react/24/solid";
import { useAppDispatch, useAppSelector } from "@state/index";
import { setBarStatus } from "@state/resultsBar";

export default function ResultsBar() {
  const { opened } = useAppSelector((state) => state.resultsBar);
  const dispatch = useAppDispatch();

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
          will-change-transform
          origin-center
          ${!opened && "opacity-50 hover:opacity-100"}
          transition-all
          ${opened ? styles.iconOpen : styles.iconClosed}
        `}
      >
        <Button
          buttonColor={ButtonColor.Blue}
          aria-label="Open or close results"
          data-tooltip-content="Open or close results"
          data-tooltip-id="tooltip"
          onClick={() => dispatch(setBarStatus(!opened))}
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
