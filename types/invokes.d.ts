type TEventPayloadInvoke = {
  getVersion: string;
  addReminder: undefined;
  updateReminder: undefined;
  deleteReminder: undefined;
};

type TIdReminder = {
  id: string;
};

type TEventSendInvoke = {
  getVersion: string;
  addReminder: Pick<TReminder, "name" | "isDaily" | "time" | "date">;
  updateReminder: Pick<TReminder, "id" | "name" | "isDaily" | "time" | "date">;
  deleteReminder: TIdReminder;
};

type TInvoke = {
  getVersion: () => Promise<TEventSendInvoke["getVersion"]>;
  addReminder: (
    payload: TEventSendInvoke["addReminder"]
  ) => Promise<TEventPayloadInvoke["addReminder"]>;
  updateReminder: (
    payload: TEventSendInvoke["updateReminder"]
  ) => Promise<TEventPayloadInvoke["addReminder"]>;
  deleteReminder: (
    payload: TEventSendInvoke["deleteReminder"]
  ) => Promise<TEventPayloadInvoke["deleteReminder"]>;
};
