import { useCallback } from "react";
import { extractTimeFromIso, extractDateFromIso } from "@utils/date";

type ParamsHookUseControl = {
  time?: Date;
  date?: Date;
};

export function useControl({ time, date }: ParamsHookUseControl) {
  const dateTime = useCallback(
    (value: "date" | "time") => {
      if (value === "time" && time) {
        return extractTimeFromIso(time);
      }
      if (value === "date" && date) {
        return extractDateFromIso(date);
      }
      return undefined;
    },
    [time, date]
  );

  return { dateTime };
}
