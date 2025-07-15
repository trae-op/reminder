import Tooltip from "@mui/material/Tooltip";
import Stack from "@mui/material/Stack";
import EventRepeatIcon from "@mui/icons-material/EventRepeat";
import { memo } from "react";
import { TPropsDatetime } from "./types";

export const Datetime = memo(({ isDaily, date, dateTime }: TPropsDatetime) => {
  if (isDaily || date === undefined) return null;
  return (
    <Tooltip title="Datetime" placement="top" arrow>
      <Stack direction="row" alignItems="center" spacing={0.5}>
        <EventRepeatIcon fontSize="small" />{" "}
        <time>{`${dateTime("date")} / ${dateTime("time")}`}</time>
      </Stack>
    </Tooltip>
  );
});
