import { PickerValue } from "@mui/x-date-pickers/internals";

export type TContext = {
  name: string;
  date?: Date;
  time?: Date;
};

export type TContextActions = {
  setName: React.Dispatch<React.SetStateAction<TContext["name"]>>;
  handleDateChange: (value: PickerValue) => void;
  handleTimeChange: (value: PickerValue) => void;
};
