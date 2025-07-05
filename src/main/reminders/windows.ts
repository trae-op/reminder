import { BrowserWindow } from "electron";
import { createWindow } from "../@shared/control-window/create.js";

export function openReminderWindow(
  hash: TWindows["addReminder"] | TWindows["updateReminder"],
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

export function openDeleteWindow(id: string): BrowserWindow {
  return createWindow({
    hash: `window/reminder/delete/${id}`,
    isCache: true,
    options: {
      alwaysOnTop: true,
      width: 350,
      height: 190,
    },
  });
}
