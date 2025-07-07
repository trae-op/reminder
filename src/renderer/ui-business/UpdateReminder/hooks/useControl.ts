import { ChangeEvent, useCallback, useMemo } from "react";
import { useControlContextActions } from "./useControlContext";
import { THookControl } from "./types";

export const useControl = (): THookControl => {
  const { setName } = useControlContextActions();

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
      const time = formData.get("time");
      const date = formData.get("date");
      const daily = formData.get("daily");

      let _date: Date | undefined = undefined;
      if (typeof date === "string" && date) {
        const parsed = new Date(date);
        if (!isNaN(parsed.getTime())) {
          _date = parsed;
        }
      }

      let _time: Date | undefined = undefined;
      if (typeof time === "string" && time) {
        const parsed = new Date(time);
        if (!isNaN(parsed.getTime())) {
          _time = parsed;
        }
      }

      if (typeof name === "string" && name.length && _time !== undefined) {
        await window.electron.invoke.addReminder({
          name,
          time: _time,
          date: _date,
          isDaily: !!daily,
        });
      }
    },
    []
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
