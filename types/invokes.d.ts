type TEventPayloadInvoke = {
  getVersion: string;
  addReminder: undefined;
  deleteReminder: undefined;
};

type TIdReminder = {
  id: string;
};

type TEventSendInvoke = {
  getVersion: string;
  addReminder: Pick<TReminder, "name" | "isDaily" | "datetime">;
  deleteReminder: TIdReminder;
};

type TInvoke = {
  getVersion: () => Promise<TEventSendInvoke["getVersion"]>;
  addReminder: (
    payload: TEventSendInvoke["addReminder"]
  ) => Promise<TEventPayloadInvoke["addReminder"]>;
  deleteReminder: (
    payload: TEventSendInvoke["deleteReminder"]
  ) => Promise<TEventPayloadInvoke["deleteReminder"]>;
};
