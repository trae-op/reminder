import { memo } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import {
  Provider as ProviderReminders,
  Items,
  useControlContext as useControlContextResources,
} from "@ui-business/Reminders";

const Container = memo(({ children }: { children: React.ReactElement }) => {
  const { list } = useControlContextResources();

  if ((list !== undefined && list.length === 0) || list === undefined) {
    return (
      <Stack
        spacing={2}
        direction="row"
        sx={{ flexWrap: "wrap", width: "100%", height: "100%" }}
        useFlexGap
      >
        <Typography
          sx={{ textAlign: "center", width: "100%", margin: "auto" }}
          gutterBottom
          variant="h5"
        >
          Empty
        </Typography>
      </Stack>
    );
  }

  return (
    <Box
      sx={{
        width: "100%",
        height: "calc(100vh - 80px)",
        overflowY: "auto",
        overflowX: "hidden",
        p: 0,

        "&::-webkit-scrollbar": {
          width: "1px",
        },
      }}
    >
      <Stack
        spacing={2}
        direction="row"
        sx={{ flexWrap: "wrap", width: "100%" }}
        useFlexGap
      >
        {children}
      </Stack>
    </Box>
  );
});

const Reminders = memo(() => {
  return (
    <ProviderReminders>
      <Container>
        <Items />
      </Container>
    </ProviderReminders>
  );
});

export default Reminders;
