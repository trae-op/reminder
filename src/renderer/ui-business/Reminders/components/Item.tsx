import { memo, useCallback } from "react";
import IconButton from "@mui/material/IconButton";
import EventRepeatIcon from "@mui/icons-material/EventRepeat";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import EditIcon from "@mui/icons-material/Edit";
import Delete from "@mui/icons-material/Delete";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { extractTimeFromIso, extractDateFromIso } from "@utils/date";
import { TPropsItem } from "./types";

function arePropsEqual(oldProps: TPropsItem, newProps: TPropsItem): boolean {
  return (
    oldProps.name === newProps.name &&
    oldProps.id === newProps.id &&
    oldProps.isDaily === newProps.isDaily &&
    oldProps.date === newProps.date &&
    oldProps.time === newProps.time
  );
}

export const Item = memo(
  ({
    name,
    id,
    handleUpdate,
    handleDelete,
    isDaily,
    date,
    time,
  }: TPropsItem) => {
    const dateTime = useCallback(
      (value: "date" | "time") => {
        if (value === "time") {
          return extractTimeFromIso(time);
        }

        if (value === "date" && date) {
          return extractDateFromIso(date);
        }

        return undefined;
      },
      [time, date]
    );

    return (
      <Card sx={{ width: "100%" }}>
        <CardContent>
          <Typography gutterBottom variant="h5">
            {name}
          </Typography>
        </CardContent>
        <CardActions
          sx={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          {isDaily && (
            <Tooltip title="Daily" placement="top" arrow>
              <Stack direction="row" alignItems="center" spacing={0.5}>
                <EventRepeatIcon fontSize="small" />{" "}
                <time>{dateTime("time")}</time>
              </Stack>
            </Tooltip>
          )}

          {Boolean(!isDaily && date !== undefined) && (
            <Tooltip title="Datetime" placement="top" arrow>
              <Stack direction="row" alignItems="center" spacing={0.5}>
                <EventRepeatIcon fontSize="small" />{" "}
                <time>{`${dateTime("date")} / ${dateTime("time")}`}</time>
              </Stack>
            </Tooltip>
          )}

          <IconButton data-id={id} onClick={handleUpdate}>
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton data-id={id} onClick={handleDelete}>
            <Delete fontSize="small" />
          </IconButton>
        </CardActions>
      </Card>
    );
  },
  arePropsEqual
);
