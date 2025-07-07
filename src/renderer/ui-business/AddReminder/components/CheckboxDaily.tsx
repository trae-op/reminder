import { useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

export const CheckboxDaily = () => {
  const [isDaily, setDaily] = useState(false);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDaily(event.target.checked);
  };

  return (
    <FormControlLabel
      control={
        <Checkbox checked={isDaily} onChange={handleChange} name="daily" />
      }
      label="Daily"
    />
  );
};
