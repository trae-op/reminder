import { ChangeEvent, useCallback, useMemo } from "react";
import {
  useControlContextActions,
  useControlContext,
} from "./useControlContext";
import { THookControl } from "./types";

export const useControl = (): THookControl => {
  const { setName } = useControlContextActions();
  const { time, date, id } = useControlContext();

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
      const daily = formData.get("daily");

      if (
        typeof name === "string" &&
        name.length &&
        time !== undefined &&
        id !== undefined
      ) {
        await window.electron.invoke.updateReminder({
          id,
          name,
          time,
          date,
          isDaily: daily == "on",
        });
      }
    },
    [time, date, id]
  );

  const value = useMemo(
    () => ({
      handleAdd,
      submitFormAction,
      handleTextInputChange,
    }),
    [handleAdd, submitFormAction, handleTextInputChange]
  );

  return value;
};
