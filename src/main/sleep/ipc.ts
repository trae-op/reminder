import { ipcMainOn, ipcWebContentsSend } from "../@shared/utils.js";
import { getWindow } from "../@shared/control-window/receive.js";
import { checkSleep, sleepInterval } from "./service.js";

export function registerIpc(): void {
  ipcMainOn("sleep", () => {
    const mainWindow = getWindow<TWindows["main"]>("window:main");
    if (mainWindow !== undefined) {
      checkSleep(mainWindow);
      sleepInterval(mainWindow);
    }
  });
}
