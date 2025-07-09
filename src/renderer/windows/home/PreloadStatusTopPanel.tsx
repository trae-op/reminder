import CircularProgress from "@mui/material/CircularProgress";
import { useControlContext } from "@ui-business/Auth";

export const PreloadStatusTopPanel = () => {
  const { isSleepOff } = useControlContext();

  if (isSleepOff) {
    return null;
  }

  return <CircularProgress size={20} />;
};
