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
      const datetimeRaw = formData.get("datetime");
      const daily = formData.get("daily");

      let datetime: Date | undefined = undefined;
      if (typeof datetimeRaw === "string" && datetimeRaw) {
        const parsed = new Date(datetimeRaw);
        if (!isNaN(parsed.getTime())) {
          datetime = parsed;
        }
      }

      if (typeof name === "string" && name.length && datetime !== undefined) {
        await window.electron.invoke.addReminder({
          name,
          datetime,
          isDaily: !!daily,
        });
      }
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
