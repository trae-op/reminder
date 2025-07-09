type TStatusesUpdate =
  | "checking-for-update"
  | "update-not-available"
  | "update-available"
  | "download-progress"
  | "update-downloaded"
  | "error";
type TUnsubscribeFunction = () => void;

type TOpenUpdateApp = {
  isOpen: boolean;
};

type TAuth = {
  isAuthenticated: boolean;
};

type TUpdateData = {
  downloadedPercent?: string;
  message?: string;
  version?: string;
  platform?: string;
  updateFile?: string;
  status: TStatusesUpdate;
};

type TReminders = {
  items: TReminder[];
};
type TGetReminder = {
  item: TReminder | undefined;
};

type TSleep = {
  ok: boolean;
};

type TEventPayloadReceive = {
  updateApp: TUpdateData;
  openUpdateApp: TOpenUpdateApp;
  auth: TAuth;
  user: {
    user: TUser;
  };
  reminders: TReminders;
  getReminder: TGetReminder;
  sleep: TSleep;
};

type TReceive = {
  subscribeWindowOpenUpdateApp: (
    callback: (payload: TEventPayloadReceive["openUpdateApp"]) => void
  ) => TUnsubscribeFunction;
  subscribeUpdateApp: (
    callback: (payload: TEventPayloadReceive["updateApp"]) => void
  ) => TUnsubscribeFunction;
  subscribeWindowAuth: (
    callback: (payload: TEventPayloadReceive["auth"]) => void
  ) => TUnsubscribeFunction;
  subscribeUser: (
    callback: (payload: TEventPayloadReceive["user"]) => void
  ) => TUnsubscribeFunction;
  subscribeReminders: (
    callback: (payload: TEventPayloadReceive["reminders"]) => void
  ) => TUnsubscribeFunction;
  subscribeGetReminder: (
    callback: (payload: TEventPayloadReceive["getReminder"]) => void
  ) => TUnsubscribeFunction;
  subscribeSleep: (
    callback: (payload: TEventPayloadReceive["sleep"]) => void
  ) => TUnsubscribeFunction;
};
