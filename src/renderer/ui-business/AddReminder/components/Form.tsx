import { useActionState, memo } from "react";
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDateTimePicker } from "@mui/x-date-pickers/MobileDateTimePicker";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useControl } from "../hooks/useControl";
import { SubmitButton } from "./SubmitButton";

export const Form = memo(() => {
  const { submitFormAction, isDaily, handleChange } = useControl();
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
          <DemoContainer components={["MobileDateTimePicker"]}>
            <DemoItem label="Mobile variant">
              <MobileDateTimePicker
                name="datetime"
                defaultValue={dayjs("2022-04-17T15:30")}
              />
            </DemoItem>
          </DemoContainer>
        </LocalizationProvider>

        <FormControlLabel
          control={
            <Checkbox checked={isDaily} onChange={handleChange} name="daily" />
          }
          label="Daily"
        />
        <SubmitButton />
      </Stack>
    </form>
  );
});
