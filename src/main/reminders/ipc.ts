import { ipcMainOn } from "../@shared/utils.js";
import { cacheReminders } from "../@shared/cache-responses.js";
import { list } from "./services/response.js";
import { openDeleteWindow, openReminderWindow } from "./windows.js";

export function registerIpc(): void {
  ipcMainOn("reminders", async (event: Electron.IpcMainEvent) => {
    const remindersFromCache = cacheReminders();
    if (remindersFromCache !== undefined) {
      event.reply("reminders", {
        reminders: remindersFromCache,
      });
    }

    const reminders = await list();
    if (reminders !== undefined) {
      event.reply("reminders", {
        reminders,
      });
    }
  });

  ipcMainOn("openDelete", (_, { id }) => {
    openDeleteWindow(id);
  });

  ipcMainOn("openUpdate", (_, { id }) => {
    openReminderWindow("window/reminder/update", id);
  });

  ipcMainOn("openAdd", () => {
    const win = openReminderWindow("window/reminder/add");

    win.webContents.openDevTools();
  });
}
