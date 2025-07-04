import { forwardRef } from "react";
import { useControlContext } from "../../hooks";
import { useUpdateDownloaded } from "../../hooks";
import type { TComponentGenericForwardRef } from "./types";

export const DownloadedButton = forwardRef(
  ({ component: Component, children, ...otherProps }, ref) => {
    const { status, version } = useControlContext();
    const { handleUpdate } = useUpdateDownloaded();

    if (status !== "update-downloaded" && version === undefined) {
      return null;
    }

    return (
      <Component onClick={handleUpdate} ref={ref} {...otherProps}>
        {children}
        {` v${version}`}
      </Component>
    );
  }
) as TComponentGenericForwardRef;
