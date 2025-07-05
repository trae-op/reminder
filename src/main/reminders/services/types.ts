export type TPostBody = Pick<
  TReminder,
  "userId" | "name" | "isDaily" | "datetime"
>;

export type TPutBody =
  | Pick<TReminder, "userId">
  | Pick<TReminder, "name">
  | Pick<TReminder, "isDaily">
  | Pick<TReminder, "datetime">;
