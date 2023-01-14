import Button, { ButtonColor } from "@components/Button";
import { classes } from "@utils";
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
        className={classes(
          "absolute",
          "h-full",
          "w-full",
          "bg-[#ffffff41]",
          "backdrop:filter",
          "backdrop-blur-md",
          "-right-1/2",
          "z-10",
          "transition-transform",
          opened ? styles.open : styles.closed
        )}
      ></div>
      <span
        className={classes(
          "z-10",
          "absolute",
          "top-1/2",
          "-translate-y-1/2",
          "transition-transform",
          opened ? styles.iconOpen : styles.iconClosed
        )}
      >
        <Button
          buttonColor={ButtonColor.Blue}
          onClick={() =>
            setSidebarState({ ...sidebarState, opened: !opened })
          }
        >
          <ChevronDoubleRightIcon
            className={classes("w-5", "h-5", "transition-transform")}
          />
        </Button>
      </span>
    </>
  );
}
