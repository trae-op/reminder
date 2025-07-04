type TOpenLatestVersion = {
  updateFile: string;
};

type TWindowAuth = {
  provider: TProviders;
};

type TGetReminder = {
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
  getReminder: TGetReminder;
  openUpdate: TGetReminder;
  openDelete: TGetReminder;
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
  getReminder: (payload: TEventPayloadSend["getReminder"]) => void;
  windowOpenUpdate: (payload: TEventPayloadSend["openUpdate"]) => void;
  windowOpenDelete: (payload: TEventPayloadSend["openDelete"]) => void;
};
