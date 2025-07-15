export type TPropsItem = Partial<
  Pick<TReminder, "id" | "name" | "isDaily" | "date" | "time">
> & {
  handleUpdate?: () => void;
  handleDelete?: () => void;
  isSleepOff?: boolean;
};

export type TPropsDaily = {
  isDaily?: boolean;
  dateTime: (value: "date" | "time") => string | undefined;
};

export type TPropsDatetime = {
  isDaily?: boolean;
  date?: Date;
  dateTime: (value: "date" | "time") => string | undefined;
};
