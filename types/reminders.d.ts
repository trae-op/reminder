type TReminder = {
  id: number;
  userId: number;
  name: string;
  isDaily: boolean;
  date?: Date;
  time: Date;
  createdAt: Date;
  updatedAt: Date;
};

type TPostBody = Pick<
  TReminder,
  "userId" | "name" | "isDaily" | "time" | "date"
>;

type TPutBody =
  | Pick<TReminder, "userId">
  | Pick<TReminder, "name">
  | Pick<TReminder, "isDaily">
  | Pick<TReminder, "time">
  | Pick<TReminder, "date">;
