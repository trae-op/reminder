import {
  ipcMainHandle,
  ipcMainOn,
  ipcWebContentsSend,
} from "../@shared/utils.js";
import { cacheReminders } from "../@shared/cache-responses.js";
import { getElectronStorage } from "../@shared/store.js";
import { list, add, update, byId, deleteById } from "./services/response.js";
import { openReminderWindow } from "./windows.js";
import { getWindow } from "../@shared/control-window/receive.js";

export function registerIpc(): void {
  let deleteWindowId: string | undefined = undefined;
  ipcMainOn("reminders", async (event: Electron.IpcMainEvent) => {
    const remindersFromCache = cacheReminders();

    if (remindersFromCache !== undefined) {
      event.reply("reminders", {
        items: remindersFromCache,
      });
    }

    const reminders = await list();
    if (reminders !== undefined) {
      event.reply("reminders", {
        items: reminders,
      });
    }
  });

  ipcMainOn("openDelete", (_, { id }) => {
    deleteWindowId = id;
    openReminderWindow("window/reminder/delete", id);
  });

  ipcMainOn("openUpdate", (_, { id }) => {
    const win = openReminderWindow("window/reminder/update", id);

    win.webContents.openDevTools();
  });

  ipcMainOn("openAdd", () => {
    const win = openReminderWindow("window/reminder/add");

    win.webContents.openDevTools();
  });

  ipcMainHandle("addReminder", async (payload) => {
    if (payload === undefined) {
      return undefined;
    }

    const userId = getElectronStorage("userId");

    if (userId === undefined) {
      return undefined;
    }
    const response = await add({
      name: payload.name,
      isDaily: payload.isDaily,
      time: payload.time,
      date: payload.date,
      userId: Number(userId),
    });

    if (response === undefined) {
      return;
    }

    const mainWindow = getWindow<TWindows["main"]>("window:main");
    const addReminderWindow = getWindow<TWindows["addReminder"]>(
      "window/reminder/add"
    );
    if (mainWindow !== undefined && addReminderWindow !== undefined) {
      const reminders = await list();
      ipcWebContentsSend("reminders", mainWindow.webContents, {
        items: reminders || [],
      });
      addReminderWindow.hide();
    }

    return undefined;
  });

  ipcMainHandle("updateReminder", async (payload) => {
    if (payload === undefined) {
      return undefined;
    }

    const userId = getElectronStorage("userId");

    if (userId === undefined) {
      return undefined;
    }

    const response = await update(payload.id + "", {
      name: payload.name,
      isDaily: payload.isDaily,
      time: payload.time,
      date: payload.date,
      userId: Number(userId),
    });

    if (response === undefined) {
      return;
    }

    const mainWindow = getWindow<TWindows["main"]>("window:main");
    const updateReminderWindow = getWindow(
      `window/reminder/update/${response.id}`
    );
    console.log("updateReminderWindow", updateReminderWindow);
    if (mainWindow !== undefined && updateReminderWindow !== undefined) {
      const reminders = await list();
      ipcWebContentsSend("reminders", mainWindow.webContents, {
        items: reminders || [],
      });
      updateReminderWindow.hide();
    }

    return undefined;
  });

  ipcMainOn("getReminder", async (event, { id }) => {
    const item = await byId(id);

    event.reply("getReminder", {
      item,
    });
  });

  ipcMainHandle("deleteReminder", async (payload) => {
    if (payload === undefined) {
      return undefined;
    }

    const response = await deleteById(payload.id);

    if (response === undefined) {
      return;
    }

    const mainWindow = getWindow<TWindows["main"]>("window:main");
    const deleteReminderWindow = getWindow(
      `window/reminder/delete/${deleteWindowId}`
    );
    if (mainWindow !== undefined && deleteReminderWindow !== undefined) {
      const reminders = await list();
      ipcWebContentsSend("reminders", mainWindow.webContents, {
        items: reminders || [],
      });
      deleteReminderWindow.hide();
    }

    return undefined;
  });

  ipcMainOn("cancelDeleteReminder", () => {
    const deleteReminderWindow = getWindow(
      `window/reminder/delete/${deleteWindowId}`
    );

    if (deleteReminderWindow !== undefined) {
      deleteReminderWindow.hide();
    }
  });
}
