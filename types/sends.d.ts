type TOpenLatestVersion = {
  updateFile: string;
};

type TWindowAuth = {
  provider: TProviders;
};

type TCallbackGetReminder = {
  id: string;
};

type TEventPayloadSend = {
  restart: undefined;
  windowClosePreload: undefined;
  user: undefined;
  logout: undefined;
  checkAuth: undefined;
  windowAuth: TWindowAuth;
  openLatestVersion: TOpenLatestVersion;
  reminders: undefined;
  getReminder: TCallbackGetReminder;
  openUpdate: TCallbackGetReminder;
  openDelete: TCallbackGetReminder;
  openAdd: undefined;
  sleep: undefined;
  startScheduler: undefined;
  cancelDeleteReminder: undefined;
};

type TSend = {
  restart: () => void;
  windowClosePreload: () => void;
  user: () => void;
  checkAuth: () => void;
  logout: () => void;
  windowAuth: (payload: TEventPayloadSend["windowAuth"]) => void;
  openLatestVersion: (payload: TEventPayloadSend["openLatestVersion"]) => void;
  reminders: () => void;
  windowOpenAdd: () => void;
  getReminder: (payload: TEventPayloadSend["getReminder"]) => void;
  windowOpenUpdate: (payload: TEventPayloadSend["openUpdate"]) => void;
  windowOpenDelete: (payload: TEventPayloadSend["openDelete"]) => void;
  windowOpenDelete: (payload: TEventPayloadSend["openDelete"]) => void;
  cancelDeleteReminder: () => void;
  startScheduler: () => void;
  sleep: () => void;
};
