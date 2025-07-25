export type ParamsHookUseControl = {
  time?: Date;
  date?: Date;
};

export type DateTimeExtractor = (value: "date" | "time") => string | undefined;
