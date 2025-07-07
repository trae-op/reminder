import { useActionState, memo } from "react";
import Stack from "@mui/material/Stack";
import { LoadingSpinner } from "@components/LoadingSpinner";
import { useControl } from "../hooks/useControl";
import { SubmitButton } from "./SubmitButton";
import { CheckboxDaily } from "./CheckboxDaily";
import { TextFieldName } from "./TextFieldName";
import { DateTextField } from "./DateTextField";
import { TimeTextField } from "./TimeTextField";
import { useIpc } from "../hooks/useIpc";

export const Form = memo(() => {
  const { isLoading } = useIpc();
  const { submitFormAction } = useControl();
  const [_, formAction] = useActionState(submitFormAction, undefined);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <form action={formAction} noValidate autoComplete="off">
      <Stack direction="column" spacing={1}>
        <TextFieldName />
        <DateTextField />
        <TimeTextField />
        <CheckboxDaily />
        <SubmitButton />
      </Stack>
    </form>
  );
});
