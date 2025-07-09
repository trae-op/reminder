import { lazy, memo, Suspense } from "react";
import Stack from "@mui/material/Stack";
import ListItemButton, {
  ListItemButtonProps,
} from "@mui/material/ListItemButton";
import { grey } from "@mui/material/colors";
import { UserPopover, ContextUserPopover } from "@ui-business/User";
import { LogoutButton } from "@ui-business/Auth";
import {
  useIpc as useIpcUpdate,
  Context as ContextUpdater,
  DownloadedButton,
} from "@ui-business/Updater";
import { TopPanel } from "@layouts/TopPanel";
import { Container as ContainerAppVersion } from "@ui-composites/AppVersion";
import CircularProgress from "@mui/material/CircularProgress";
import { PreloadStatusTopPanel } from "./PreloadStatusTopPanel";

const LazyAddReminderButton = lazy(() => import("./AddReminderButton"));

const ContainerTopPanel = memo(() => {
  const value = useIpcUpdate();

  return (
    <TopPanel
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        paddingTop: 0.5,
        paddingBottom: 0.5,
        paddingRight: 1,
        paddingLeft: 1,
        backgroundColor: grey[900],
      }}
    >
      <ContainerAppVersion sx={{ width: "100%" }} variant="caption" />
      <Stack
        spacing={1}
        direction="row"
        justifyContent="flex-end"
        alignItems="center"
        sx={{ width: "100%" }}
      >
        <PreloadStatusTopPanel />

        <Suspense fallback={<CircularProgress size={20} />}>
          <LazyAddReminderButton />
        </Suspense>

        <ContextUserPopover.Provider
          value={{
            isNewVersionApp: value.status === "update-downloaded",
            renderButtonLogout: (
              <LogoutButton<ListItemButtonProps> component={ListItemButton}>
                Logout
              </LogoutButton>
            ),
            renderButtonUpdateApp: (
              <ContextUpdater.Provider value={value}>
                <DownloadedButton<ListItemButtonProps>
                  component={ListItemButton}
                >
                  Update
                </DownloadedButton>
              </ContextUpdater.Provider>
            ),
          }}
        >
          <UserPopover />
        </ContextUserPopover.Provider>
      </Stack>
    </TopPanel>
  );
});

export default ContainerTopPanel;
