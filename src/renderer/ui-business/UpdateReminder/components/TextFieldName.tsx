import TextField from "@mui/material/TextField";
import { useControl } from "../hooks/useControl";
import { useControlContext } from "../hooks/useControlContext";

export const TextFieldName = () => {
  const { handleTextInputChange } = useControl();
  const { name } = useControlContext();

  return (
    <TextField
      name="name"
      label="Name"
      variant="outlined"
      onChange={handleTextInputChange}
      value={name}
      fullWidth
      required
    />
  );
};
