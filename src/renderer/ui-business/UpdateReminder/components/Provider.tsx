import { useState, useMemo } from "react";
import type { TPropsProvider } from "./types";
import { Context, ContextActions } from "../context";
import { TContext } from "../context/type";

export const Provider = ({ children }: TPropsProvider) => {
  const [name, setName] = useState<TContext["name"]>("");
  const [date, setDate] = useState<TContext["date"]>(undefined);
  const [time, setTime] = useState<TContext["time"]>(undefined);
  const [isDaily, setDaily] = useState<TContext["daily"]>(undefined);

  const value = useMemo(
    () => ({
      name,
      date,
      time,
      isDaily,
    }),
    [name, isDaily, date, time]
  );

  const actions = useMemo(
    () => ({
      setName,
      setDaily,
      setDate,
      setTime,
    }),
    [setName, setDaily, setDate, setTime]
  );

  return (
    <Context.Provider value={value}>
      <ContextActions.Provider value={actions}>
        {children}
      </ContextActions.Provider>
    </Context.Provider>
  );
};
