import { useEffect } from "react";
import { useControlContextActions } from "./useControlContext";

export const useIpc = () => {
  const { setItems } = useControlContextActions();

  useEffect(() => {
    console.log("start reminders");
    window.electron.send.reminders();
  }, []);

  useEffect(() => {
    window.electron.receive.subscribeReminders(({ items }) => {
      console.log("items", items);
      setItems(items);
    });
  }, []);
};
