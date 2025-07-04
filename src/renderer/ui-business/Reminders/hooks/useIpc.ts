import { useEffect } from "react";
import { useControlContextActions } from "./useControlContext";

export const useIpc = () => {
  const { setItems } = useControlContextActions();

  useEffect(() => {
    window.electron.send.reminders();
  }, []);

  useEffect(() => {
    window.electron.receive.subscribeReminders(({ items }) => {
      setItems(items);
    });
  }, []);
};
