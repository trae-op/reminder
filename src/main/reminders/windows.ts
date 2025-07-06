import { BrowserWindow } from "electron";
import { createWindow } from "../@shared/control-window/create.js";

export function openReminderWindow(
  hash:
    | TWindows["addReminder"]
    | TWindows["updateReminder"]
    | TWindows["deleteReminder"],
  id?: string
): BrowserWindow {
  return createWindow({
    hash: `${hash}${id !== undefined ? `/${id}` : ""}`,
    isCache: true,
    options: {
      alwaysOnTop: true,
      width: 400,
      height: 400,
    },
  });
}
