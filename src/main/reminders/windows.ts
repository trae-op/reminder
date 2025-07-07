import { BrowserWindow } from "electron";
import { createWindow } from "../@shared/control-window/create.js";
import { TParamOpenReminderWindow } from "./types.js";

export function openReminderWindow({
  id,
  hash,
  options,
}: TParamOpenReminderWindow): BrowserWindow {
  return createWindow({
    hash: `${hash}${id !== undefined ? `/${id}` : ""}`,
    isCache: true,
    options: {
      alwaysOnTop: true,
      width: 400,
      height: 400,
      ...(options || {}),
    },
  });
}
