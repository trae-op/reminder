import { ipcMainOn, ipcWebContentsSend } from "../@shared/utils.js";
import { getWindow } from "../@shared/control-window/receive.js";
import { sleepInterval } from "./service.js";

export function registerIpc(): void {
  ipcMainOn("sleep", () => {
    const mainWindow = getWindow<TWindows["main"]>("window:main");
    if (mainWindow !== undefined) {
      ipcWebContentsSend("sleepOff", mainWindow.webContents, {
        ok: false,
      });
      sleepInterval(mainWindow);
    }
  });
}
