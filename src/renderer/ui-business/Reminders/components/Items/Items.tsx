import { forwardRef } from "react";
import { useControlContext, useIpc } from "../../hooks";
import type { TComponentGenericForwardRef } from "./types";

export const Items = forwardRef(
  ({ component: Component, ...otherProps }, ref) => {
    useIpc();
    const { list } = useControlContext();

    if (list === undefined) {
      return null;
    }

    return list.map((item) => {
      const handleUpdate = () => {
        window.electron.send.windowOpenUpdate({
          id: item.id + "",
        });
      };

      const handleDelete = () => {
        window.electron.send.windowOpenDelete({
          id: item.id + "",
        });
      };

      return (
        <Component
          key={item.id + ""}
          id={item.id}
          name={item.name}
          isDaily={item.isDaily}
          date={item.date}
          time={item.time}
          handleUpdate={handleUpdate}
          handleDelete={handleDelete}
          ref={ref}
          {...otherProps}
        />
      );
    });
  }
) as TComponentGenericForwardRef;
