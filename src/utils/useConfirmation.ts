import { useMemo, useState } from "react";

export default function useConfirmation() {
  const [rerender, setRerender] = useState(false);

  return useMemo(() => {
    let confirm: (should: boolean) => void = null!;
    const promise = new Promise<boolean>((res) => {
      confirm = (val) => {
        resetConfirmation();
        res(val);
      };
    });

    function resetConfirmation() {
      setRerender((state) => !state);
    }

    return [promise, confirm] as const;
  }, [rerender]);
}
