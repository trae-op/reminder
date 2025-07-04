export type TContext = {
  list: TReminder[] | undefined;
};

export type TContextActions = {
  setItems: (items: TReminder[]) => void;
};
