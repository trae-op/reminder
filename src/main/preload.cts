const electron = require("electron");

electron.contextBridge.exposeInMainWorld("electron", {
  receive: {
    subscribeUpdateApp: (callback) =>
      ipcOn("updateApp", (payload) => {
        callback(payload);
      }),
    subscribeWindowAuth: (callback) =>
      ipcOn("auth", (payload) => {
        callback(payload);
      }),
    subscribeWindowOpenUpdateApp: (callback) =>
      ipcOn("openUpdateApp", (payload) => {
        callback(payload);
      }),
    subscribeUser: (callback) =>
      ipcOn("user", (payload) => {
        callback(payload);
      }),
    subscribeReminders: (callback) =>
      ipcOn("reminders", (payload) => {
        callback(payload);
      }),
    subscribeGetReminder: (callback) =>
      ipcOn("getReminder", (payload) => {
        callback(payload);
      }),
    subscribeSleepOff: (callback) =>
      ipcOn("sleepOff", (payload) => {
        callback(payload);
      }),
  },
  send: {
    sleep: () => {
      ipcSend("sleep");
    },
    restart: () => {
      ipcSend("restart");
    },
    user: () => {
      ipcSend("user");
    },
    checkAuth: () => {
      ipcSend("checkAuth");
    },
    logout: () => {
      ipcSend("logout");
    },
    windowAuth: (payload) => {
      ipcSend("windowAuth", payload);
    },
    windowClosePreload: () => {
      ipcSend("windowClosePreload");
    },
    openLatestVersion: (payload) => {
      ipcSend("openLatestVersion", payload);
    },
    windowOpenDelete: (payload) => {
      ipcSend("openDelete", payload);
    },
    windowOpenAdd: () => {
      ipcSend("openAdd");
    },
    startScheduler: () => {
      ipcSend("startScheduler");
    },
    windowOpenUpdate: (payload) => {
      ipcSend("openUpdate", payload);
    },
    reminders: () => {
      ipcSend("reminders");
    },
    getReminder: (payload) => {
      ipcSend("getReminder", payload);
    },
    cancelDeleteReminder: () => {
      ipcSend("cancelDeleteReminder");
    },
  },
  invoke: {
    getVersion: () => ipcInvoke("getVersion"),
    addReminder: (payload) => ipcInvoke("addReminder", payload),
    updateReminder: (payload) => ipcInvoke("updateReminder", payload),
    deleteReminder: (payload) => ipcInvoke("deleteReminder", payload),
  },
} satisfies Window["electron"]);

function ipcInvoke<
  Key extends keyof TEventPayloadInvoke,
  S extends keyof TEventSendInvoke
>(key: Key, payload?: TEventSendInvoke[S]): Promise<TEventPayloadInvoke[Key]> {
  return electron.ipcRenderer.invoke(key, payload);
}

function ipcSend<Key extends keyof TEventPayloadSend>(
  key: Key,
  payload?: TEventPayloadSend[Key]
) {
  electron.ipcRenderer.send(key, payload);
}

function ipcOn<Key extends keyof TEventPayloadReceive>(
  key: Key,
  callback: (payload: TEventPayloadReceive[Key]) => void
) {
  const cb = (
    _: Electron.IpcRendererEvent,
    payload: TEventPayloadReceive[Key]
  ) => callback(payload);

  electron.ipcRenderer.on(key, cb);
  return () => electron.ipcRenderer.off(key, cb);
}
