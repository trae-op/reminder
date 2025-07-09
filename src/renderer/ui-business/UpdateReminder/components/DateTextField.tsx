import { useMemo } from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateField } from "@mui/x-date-pickers/DateField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useDayjs } from "@hooks/dayjs";
import {
  useControlContext,
  useControlContextActions,
} from "../hooks/useControlContext";

export const DateTextField = () => {
  const dayjs = useDayjs();
  const { handleDateChange } = useControlContextActions();
  const { date } = useControlContext();

  const memoizedTimeValue = useMemo(() => {
    if (!dayjs || date === null || typeof date === "undefined") {
      return null;
    }
    return dayjs(date);
  }, [dayjs, date]);

  if (memoizedTimeValue === null) {
    return null;
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DateField"]}>
        <DateField
          onChange={handleDateChange}
          value={memoizedTimeValue}
          name="date"
          label="Date"
          format="YYYY-MM-DD"
        />
      </DemoContainer>
    </LocalizationProvider>
  );
};
