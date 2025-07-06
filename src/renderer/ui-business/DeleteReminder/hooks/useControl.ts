import { useCallback, useMemo } from "react";
import { useParams } from "react-router-dom";
import { THookControl } from "./types";

export const useControl = (): THookControl => {
  const { id } = useParams<{ id: string }>();

  console.log("id", id);

  const submitFormAction = useCallback(async (): Promise<undefined> => {
    await window.electron.invoke.deleteReminder({
      id: id + "",
    });
  }, [id]);

  const handleCancel = useCallback(() => {
    window.electron.send.cancelDeleteReminder();
  }, []);

  const value = useMemo(
    () => ({
      submitFormAction,
      handleCancel,
    }),
    [submitFormAction, handleCancel]
  );

  return value;
};
