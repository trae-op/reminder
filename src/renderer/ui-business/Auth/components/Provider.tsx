import { useState, useEffect, useMemo } from "react";
import type { TPropsProvider } from "./types";
import { Context, ContextActions } from "../context";
import { TContext } from "../context/type";

export const Provider = ({ children }: TPropsProvider) => {
  const [isAuthenticated, setAuthenticated] =
    useState<TContext["isAuthenticated"]>(undefined);
  const [isSleepOff, setSleepOff] = useState(true);

  const logout = () => {
    setAuthenticated(false);
  };

  const value = useMemo(
    () => ({
      isAuthenticated,
      isSleepOff,
    }),
    [isAuthenticated, isSleepOff]
  );

  const actions = useMemo(
    () => ({
      setAuthenticated,
      setSleepOff,
      logout,
    }),
    [setAuthenticated, logout, setSleepOff]
  );

  useEffect(() => {
    setAuthenticated(isAuthenticated);
  }, []);

  return (
    <Context.Provider value={value}>
      <ContextActions.Provider value={actions}>
        {children}
      </ContextActions.Provider>
    </Context.Provider>
  );
};
