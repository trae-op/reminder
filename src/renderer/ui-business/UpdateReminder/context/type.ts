import { PickerValue } from "@mui/x-date-pickers/internals";

export type TContext = {
  id?: number;
  name: string;
  date?: Date;
  time?: Date;
  daily?: boolean;
};

export type TContextActions = {
  setName: React.Dispatch<React.SetStateAction<TContext["name"]>>;
  handleDateChange: (value: PickerValue) => void;
  handleTimeChange: (value: PickerValue) => void;
  setId: React.Dispatch<React.SetStateAction<TContext["id"]>>;
  setDaily: React.Dispatch<React.SetStateAction<TContext["daily"]>>;
  setTime: React.Dispatch<React.SetStateAction<TContext["time"]>>;
  setDate: React.Dispatch<React.SetStateAction<TContext["date"]>>;
};
