import { memo } from "react";
import IconButton from "@mui/material/IconButton";
import Card from "@mui/material/Card";
import EditIcon from "@mui/icons-material/Edit";
import Delete from "@mui/icons-material/Delete";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useControl } from "../hooks";
import { TPropsItem } from "./types";
import { Daily } from "./Daily";
import { Datetime } from "./Datetime";

function arePropsEqual(oldProps: TPropsItem, newProps: TPropsItem): boolean {
  return (
    oldProps.name === newProps.name &&
    oldProps.id === newProps.id &&
    oldProps.isDaily === newProps.isDaily &&
    oldProps.date === newProps.date &&
    oldProps.time === newProps.time &&
    oldProps.isSleepOff === newProps.isSleepOff
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
    isSleepOff = false,
  }: TPropsItem) => {
    const { dateTime } = useControl({ time, date });

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
          <Daily isDaily={isDaily} dateTime={dateTime} />
          <Datetime isDaily={isDaily} date={date} dateTime={dateTime} />

          <IconButton
            disabled={!isSleepOff}
            data-id={id}
            onClick={handleUpdate}
          >
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton
            disabled={!isSleepOff}
            data-id={id}
            onClick={handleDelete}
          >
            <Delete fontSize="small" />
          </IconButton>
        </CardActions>
      </Card>
    );
  },
  arePropsEqual
);
