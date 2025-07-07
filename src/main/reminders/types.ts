export type TParamOpenReminderWindow = {
  hash:
    | TWindows["addReminder"]
    | TWindows["updateReminder"]
    | TWindows["deleteReminder"];
  options?: Electron.BrowserWindowConstructorOptions | undefined;
  id?: string;
};
