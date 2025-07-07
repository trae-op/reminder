import { useMemo } from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimeField } from "@mui/x-date-pickers/TimeField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useDayjs } from "@hooks/dayjs";
import {
  useControlContext,
  useControlContextActions,
} from "../hooks/useControlContext";

export const TimeTextField = () => {
  const dayjs = useDayjs();
  const { handleTimeChange } = useControlContextActions();
  const { time } = useControlContext();

  const memoizedTimeValue = useMemo(() => {
    if (!dayjs || time === null || typeof time === "undefined") {
      return null;
    }
    return dayjs(time);
  }, [dayjs, time]);

  if (memoizedTimeValue === null) {
    return null;
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["TimeField"]}>
        <TimeField
          onChange={handleTimeChange}
          value={memoizedTimeValue}
          name="time"
          label="Time"
        />
      </DemoContainer>
    </LocalizationProvider>
  );
};
