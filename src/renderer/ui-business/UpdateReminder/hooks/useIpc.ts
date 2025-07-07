import { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useControlContextActions } from "./useControlContext";

export const useIpc = (): { isLoading: boolean } => {
  const [isLoading, setLoading] = useState(true);
  const { setName, setDaily, setDate, setTime, setId } =
    useControlContextActions();
  const { id } = useParams<{ id: string }>();

  const result = useMemo(
    () => ({
      isLoading,
    }),
    [isLoading]
  );

  useEffect(() => {
    window.electron.send.getReminder({ id: id || "" });
  }, [id]);

  useEffect(() => {
    const unSub = window.electron.receive.subscribeGetReminder(({ item }) => {
      if (!item) return;

      setId((prev) => (prev !== item.id ? item.id : prev));
      setName((prev) => (prev !== item.name ? item.name : prev));
      setDaily((prev) => (prev !== item.isDaily ? item.isDaily : prev));
      setDate((prev) => (prev !== item.date ? item.date : prev));
      setTime((prev) => (prev !== item.time ? item.time : prev));

      setLoading(false);
    });

    return unSub;
  }, []);

  return result;
};
