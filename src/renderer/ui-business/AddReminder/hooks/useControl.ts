import { ChangeEvent, useCallback, useMemo, useState } from "react";
import { useControlContextActions } from "./useControlContext";
import { THookControl } from "./types";

export const useControl = (): THookControl => {
  const { setName } = useControlContextActions();

  const [isDaily, setDaily] = useState(false);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDaily(event.target.checked);
  };

  const handleAdd = useCallback(() => {
    window.electron.send.windowOpenAdd();
  }, []);

  const handleTextInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setName(event.target.value);
    },
    []
  );

  const submitFormAction = useCallback(
    async (_: undefined, formData: FormData): Promise<undefined> => {
      const name = formData.get("name");
      const datetime = formData.get("datetime");
      const daily = formData.get("daily");

      // await window.electron.invoke.postResource({
      //   name,
      //   key,
      // });
    },
    []
  );

  const value = useMemo(
    () => ({
      isDaily,
      handleAdd,
      handleChange,
      submitFormAction,
      handleTextInputChange,
    }),
    [handleAdd, submitFormAction, handleTextInputChange, handleChange, isDaily]
  );

  return value;
};
