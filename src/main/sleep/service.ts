import { BrowserWindow } from "electron";
import { restApi, timers } from "../config.js";
import { get } from "../@shared/services/rest-api/service.js";
import { showErrorMessages } from "../@shared/services/error-messages.js";
import { TResponseSleep } from "./types.js";
import { ipcWebContentsSend } from "../@shared/utils.js";
import { getElectronStorage } from "../@shared/store.js";

async function sleepOff<R extends TResponseSleep>(): Promise<R | undefined> {
  const response = await get<R>(
    `${restApi.urls.base}${restApi.urls.baseApi}${restApi.urls.auth.base}${restApi.urls.auth.sleep}`
  );

  if (response.error !== undefined) {
    showErrorMessages({
      title: "Error request by sleep",
      body: response.error.message,
      isDialog: false,
    });
  }

  return response.data;
}

export async function sleepInterval(window: BrowserWindow) {
  const interval = setInterval(async () => {
    ipcWebContentsSend("sleepOff", window.webContents, {
      ok: false,
    });

    const response = await sleepOff();
    ipcWebContentsSend("sleepOff", window.webContents, {
      ok: (response !== undefined && response.ok) || true,
    });

    const authToken = getElectronStorage("authToken");
    if (authToken === undefined) {
      clearInterval(interval);
    }
  }, timers.intervalCheckSleep);
}
