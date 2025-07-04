import { useState, useMemo, useCallback } from "react";
import isEqual from "lodash.isequal";
import { Context, ContextActions } from "../context";
import type { TPropsProvider } from "./types";

export const Provider = ({ children }: TPropsProvider) => {
  const [list, setList] = useState<TReminder[] | undefined>(undefined);

  const setItems = useCallback((items: TReminder[]) => {
    setList((prevItems) => (isEqual(prevItems, items) ? prevItems : items));
  }, []);

  const value = useMemo(
    () => ({
      list,
    }),
    [list]
  );

  const actions = useMemo(
    () => ({
      setItems,
    }),
    [setItems]
  );

  return (
    <Context.Provider value={value}>
      <ContextActions.Provider value={actions}>
        {children}
      </ContextActions.Provider>
    </Context.Provider>
  );
};
