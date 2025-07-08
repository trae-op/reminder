import { useEffect } from "react";

export const useIpc = () => {
  useEffect(() => {
    window.electron.send.startScheduler();
  }, []);
};
