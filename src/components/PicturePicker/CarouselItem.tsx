import Button, { ButtonColor } from "@components/Button";
import { TrashIcon } from "@heroicons/react/24/outline";
import { c } from "@utils";

type Props = {
  imageSrc: string;
  onDelete?: () => void;
};

export default function CarouselItem(props: Props) {
  return (
    <div className={c`relative h-full w-full pointer-events-none max-h-72`}>
      <div
        className={c`absolute right-1/2 translate-x-1/2 transition-[opacity]
            opacity-30 hover:opacity-100 pointer-events-auto py-4`}
      >
        <Button buttonColor={ButtonColor.Red} aria-description="Delete Picture" onClick={props.onDelete}>
          <TrashIcon className={c`w-8 h-8`} />
        </Button>
      </div>
      <img src={props.imageSrc} className={c`h-full w-full object-scale-down`} />
    </div>
  );
}
