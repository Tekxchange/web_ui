import { c } from "@utils";
import { PropsWithChildren, useState } from "react";
import { useInterval } from "usehooks-ts";

type TooltipProps = {
  text: string;
  delay?: number;
};

const Tooltip: React.FC<PropsWithChildren<TooltipProps>> = (props) => {
  const { delay, text, children } = props;

  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [delayTimeout, setDelayTimeout] = useState<number | null>(null);

  useInterval(() => {
    setTooltipOpen(true);
  }, delayTimeout);

  function openTooltip() {
    setDelayTimeout(delay || 1000);
  }

  function closeTooltip() {
    setDelayTimeout(null);
    setTooltipOpen(false);
  }

  return (
    <span
      onMouseEnter={() => openTooltip()}
      onMouseLeave={() => closeTooltip()}
      onTouchStart={() => openTooltip()}
      onTouchEnd={() => closeTooltip()}
      className={c`relative h-full flex overflow-visible`}
    >
      <div
        className={c`${
          !tooltipOpen ? "opacity-0" : "opacity-100"
        } absolute w-max max-w-sm pointer-events-none bg-gray-700 rounded-md p-1 transition-opacity
        text-white -translate-y-1/2 bottom-full`}
        aria-hidden={!tooltipOpen}
      >
        <p>{text}</p>
      </div>
      {children}
    </span>
  );
};

export default Tooltip;
