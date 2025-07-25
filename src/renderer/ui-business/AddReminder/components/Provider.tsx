import { useState, useMemo } from "react";
import { PickerValue } from "@mui/x-date-pickers/internals";
import type { TPropsProvider } from "./types";
import { Context, ContextActions } from "../context";
import { TContext } from "../context/type";

export const Provider = ({ children }: TPropsProvider) => {
  const [name, setName] = useState<TContext["name"]>("");
  const [date, setDate] = useState<TContext["date"]>(undefined);
  const [time, setTime] = useState<TContext["time"]>(undefined);

  const handleTimeChange = (value: PickerValue) => {
    if (value) {
      const result = value.toDate();
      setTime(result);
    }
  };

  const handleDateChange = (value: PickerValue) => {
    if (value) {
      const result = value.toDate();
      setDate(result);
    }
  };

  const value = useMemo(
    () => ({
      name,
      date,
      time,
    }),
    [name, date, time]
  );

  const actions = useMemo(
    () => ({
      setName,
      handleDateChange,
      handleTimeChange,
    }),
    [setName, handleTimeChange, handleDateChange]
  );

  return (
    <Context.Provider value={value}>
      <ContextActions.Provider value={actions}>
        {children}
      </ContextActions.Provider>
    </Context.Provider>
  );
};
