// import { PickerValidValue } from "@mui/x-date-pickers/internals";

export type TContext = {
  name: string;
  date?: Date;
  time?: Date;
  daily?: boolean;
};

export type TContextActions = {
  setName: React.Dispatch<React.SetStateAction<TContext["name"]>>;
  setDate: React.Dispatch<React.SetStateAction<TContext["date"]>>;
  setTime: React.Dispatch<React.SetStateAction<TContext["time"]>>;
  setDaily: React.Dispatch<React.SetStateAction<TContext["daily"]>>;
};
