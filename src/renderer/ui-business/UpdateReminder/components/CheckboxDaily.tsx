import { useEffect, useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useControlContext } from "../hooks/useControlContext";

export const CheckboxDaily = () => {
  const { daily } = useControlContext();
  const [isDaily, setDaily] = useState<boolean>(false);
  const handleDailyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDaily((prev) =>
      prev !== event.target.checked ? event.target.checked : prev
    );
  };

  useEffect(() => {
    if (typeof daily === "boolean" && isDaily !== daily) {
      setDaily(daily);
    }
  }, [daily]);

  return (
    <FormControlLabel
      control={
        <Checkbox checked={isDaily} onChange={handleDailyChange} name="daily" />
      }
      label="Daily"
    />
  );
};
