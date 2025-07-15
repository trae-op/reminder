import Tooltip from "@mui/material/Tooltip";
import Stack from "@mui/material/Stack";
import EventRepeatIcon from "@mui/icons-material/EventRepeat";
import { memo } from "react";
import { TPropsDaily } from "./types";

export const Daily = memo(({ isDaily, dateTime }: TPropsDaily) => {
  if (!isDaily) return null;
  return (
    <Tooltip title="Daily" placement="top" arrow>
      <Stack direction="row" alignItems="center" spacing={0.5}>
        <EventRepeatIcon fontSize="small" /> <time>{dateTime("time")}</time>
      </Stack>
    </Tooltip>
  );
});
