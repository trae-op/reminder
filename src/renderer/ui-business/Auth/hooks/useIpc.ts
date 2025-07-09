import { useEffect } from "react";
import { useControlContextActions } from "./useControlContext";

export const useIpc = () => {
  const { setAuthenticated, setSleepOff } = useControlContextActions();

  useEffect(() => {
    window.electron.send.checkAuth();
  }, []);

  useEffect(() => {
    window.electron.send.sleep();
    console.log("sleep!!!");
  }, []);

  useEffect(() => {
    window.electron.receive.subscribeWindowAuth(({ isAuthenticated }) => {
      setAuthenticated(isAuthenticated);
    });
  }, []);

  useEffect(() => {
    window.electron.receive.subscribeSleep(({ ok }) => {
      setSleepOff(ok);
    });
  }, []);
};
