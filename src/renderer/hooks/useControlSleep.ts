import { useEffect } from "react";

export const useControlSleep = () => {
  useEffect(() => {
    window.electron.send.sleep();
  }, []);
};
