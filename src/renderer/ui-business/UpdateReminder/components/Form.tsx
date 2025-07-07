import { useActionState, memo } from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimeField } from "@mui/x-date-pickers/TimeField";
import { DateField } from "@mui/x-date-pickers/DateField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useDayjs } from "@hooks/dayjs";
import { useControl } from "../hooks/useControl";
import {
  useControlContext,
  useControlContextActions,
} from "../hooks/useControlContext";
import { SubmitButton } from "./SubmitButton";
import { useIpc } from "../hooks/useIpc";

export const Form = memo(() => {
  useIpc();
  const dayjs = useDayjs();
  const { handleDateChange, handleTimeChange } = useControlContextActions();
  const { time, date, daily, name } = useControlContext();
  const { submitFormAction } = useControl();
  const [_, formAction] = useActionState(submitFormAction, undefined);

  if (dayjs === undefined) {
    return null;
  }

  return (
    <form action={formAction} noValidate autoComplete="off">
      <Stack direction="column" spacing={1}>
        <TextField
          name="name"
          label="Name"
          variant="outlined"
          value={name}
          fullWidth
          required
        />

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DateField"]}>
            <DateField
              onChange={handleDateChange}
              value={dayjs(date)}
              name="date"
              label="Date"
            />
          </DemoContainer>
        </LocalizationProvider>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["TimeField"]}>
            <TimeField
              onChange={handleTimeChange}
              value={dayjs(time)}
              name="time"
              label="Time"
            />
          </DemoContainer>
        </LocalizationProvider>

        <FormControlLabel
          control={<Checkbox checked={daily} name="daily" />}
          label="Daily"
        />
        <SubmitButton />
      </Stack>
    </form>
  );
});
