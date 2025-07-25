import { useCallback } from "react";
import { extractTimeFromIso, extractDateFromIso } from "@utils/date";
import type { ParamsHookUseControl, DateTimeExtractor } from "./types";

export function useControl({ time, date }: ParamsHookUseControl) {
  const dateTime: DateTimeExtractor = useCallback(
    (value) => {
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
