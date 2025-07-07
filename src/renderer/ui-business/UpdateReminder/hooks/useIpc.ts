import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useControlContextActions } from "./useControlContext";

export const useIpc = () => {
  const { setName, setDaily, setDate, setTime } = useControlContextActions();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    window.electron.send.getReminder({
      id: id || "",
    });
  }, [id]);

  useEffect(() => {
    window.electron.receive.subscribeGetReminder(({ item }) => {
      if (item !== undefined) {
        setName((prev) => {
          if (prev.length && prev !== item.name) {
            return item.name;
          }

          return prev;
        });

        setDaily((prev) => {
          if (prev !== undefined && prev !== item.isDaily) {
            return item.isDaily;
          }

          return prev;
        });

        setDate((prev) => {
          if (prev !== undefined && prev !== item.date) {
            return item.date;
          }

          return prev;
        });

        setTime((prev) => {
          if (prev !== undefined && prev !== item.time) {
            return item.time;
          }

          return prev;
        });
      }
    });
  }, []);
};
