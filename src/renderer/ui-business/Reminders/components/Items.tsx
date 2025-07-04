import { memo } from "react";
import { useControlContext } from "../hooks";
import { useIpc } from "../hooks/useIpc";
import { Item } from "./Item";

export const Items = memo(() => {
  useIpc();
  const { list } = useControlContext();

  if (list === undefined) {
    return null;
  }

  return list.map((item) => {
    const handleUpdate = () => {
      window.electron.send.windowOpenUpdateResource({
        id: item.id + "",
      });
    };

    const handleDelete = () => {
      window.electron.send.windowOpenDeleteResource({
        id: item.id + "",
      });
    };

    return (
      <Item
        key={item.id + ""}
        id={item.id}
        name={item.name}
        handleUpdate={handleUpdate}
        handleDelete={handleDelete}
      />
    );
  });
});
