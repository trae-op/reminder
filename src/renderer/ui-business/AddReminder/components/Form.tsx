import { useActionState, memo } from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimeField } from "@mui/x-date-pickers/TimeField";
import { DateField } from "@mui/x-date-pickers/DateField";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { useControl } from "../hooks/useControl";
import { useControlContextActions } from "../hooks/useControlContext";
import { SubmitButton } from "./SubmitButton";
import { CheckboxDaily } from "./CheckboxDaily";

export const Form = memo(() => {
  const { handleDateChange, handleTimeChange } = useControlContextActions();
  const { submitFormAction } = useControl();
  const [_, formAction] = useActionState(submitFormAction, undefined);

  return (
    <form action={formAction} noValidate autoComplete="off">
      <Stack direction="column" spacing={1}>
        <TextField
          name="name"
          label="Name"
          variant="outlined"
          fullWidth
          required
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DateField"]}>
            <DateField onChange={handleDateChange} name="date" label="Date" />
          </DemoContainer>
        </LocalizationProvider>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["TimeField"]}>
            <TimeField
              onChange={handleTimeChange} // Handle changes here
              name="time"
              label="Time"
            />
          </DemoContainer>
        </LocalizationProvider>

        <CheckboxDaily />
        <SubmitButton />
      </Stack>
    </form>
  );
});
