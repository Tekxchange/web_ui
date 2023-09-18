import Button, { ButtonColor } from "@components/Button";
import Elevate, { Elevation } from "@components/lib/Elevate";
import { c } from "@utils";

type Props = {
  onCancel: () => void;
  onDelete: () => void;
};

export default function ConfirmDeleteModalContent({ onCancel, onDelete }: Props) {
  return (
    <Elevate elevation={Elevation.High}>
      <section className={c`min-h-fit p-2 w-80 flex items-center flex-col`}>
        <h2 className={c`text-lg font-semibold text-center`}>Are you sure you want to delete this listing?</h2>
        <div className={c`flex justify-evenly w-full mt-10`}>
          <Button buttonText="Cancel" buttonColor={ButtonColor.Green} onClick={onCancel} />
          <Button buttonText="Delete" buttonColor={ButtonColor.Red} onClick={onDelete} />
        </div>
      </section>
    </Elevate>
  );
}
