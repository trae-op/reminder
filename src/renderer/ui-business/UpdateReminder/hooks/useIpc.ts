import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useControlContextActions } from "./useControlContext";

export const useIpc = () => {
  const { setName, setDaily, setDate, setTime, setId } =
    useControlContextActions();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    window.electron.send.getReminder({ id: id || "" });
  }, [id]);

  useEffect(() => {
    const unSub = window.electron.receive.subscribeGetReminder(({ item }) => {
      if (!item) return;

      setId((prev) => (prev !== item.id ? item.id : prev));
      setName((prev) => (prev !== item.name ? item.name : prev));
      // setDaily((prev) => (prev !== item.isDaily ? item.isDaily : prev));
      setDaily(item.isDaily);
      setDate((prev) => (prev !== item.date ? item.date : prev));
      setTime((prev) => (prev !== item.time ? item.time : prev));
    });

    return unSub;
  }, [setId, setName, setDaily, setDate, setTime]);
};
