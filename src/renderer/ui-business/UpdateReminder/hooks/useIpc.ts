import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useControlContextActions } from "./useControlContext";

export const useIpc = () => {
  const { setName, setDaily, setDate, setTime, setId } =
    useControlContextActions();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    window.electron.send.getReminder({
      id: id || "",
    });
  }, [id]);

  useEffect(() => {
    window.electron.receive.subscribeGetReminder(({ item }) => {
      if (item !== undefined) {
        setId((prev) => {
          if (prev !== undefined && prev !== item.id) {
            return item.id;
          }

          if (prev === undefined && item.id !== undefined) {
            return item.id;
          }

          return prev;
        });
        setName((prev) => {
          if (prev.length && prev !== item.name) {
            return item.name;
          }

          if (!prev.length && item.name.length) {
            return item.name;
          }

          return prev;
        });

        setDaily((prev) => {
          if (prev !== undefined && prev !== item.isDaily) {
            return item.isDaily;
          }

          if (prev === undefined && item.isDaily !== undefined) {
            return item.isDaily;
          }

          return prev;
        });

        setDate((prev) => {
          if (prev !== undefined && prev !== item.date) {
            return item.date;
          }

          if (prev === undefined && item.date !== undefined) {
            return item.date;
          }

          return prev;
        });

        setTime((prev) => {
          if (prev !== undefined && prev !== item.time) {
            return item.time;
          }

          if (prev === undefined && item.time !== undefined) {
            return item.time;
          }

          return prev;
        });
      }
    });
  }, []);
};
