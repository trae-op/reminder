import { lazy, Suspense } from "react";
import { LoadingSpinner } from "@components/LoadingSpinner";
import { Provider as ProviderUser } from "@ui-business/User";
import Box from "@mui/material/Box";

const LazyTopPanel = lazy(() => import("./TopPanel"));
const LazyReminders = lazy(() => import("./Reminders"));

const Home = () => {
  return (
    <ProviderUser>
      <Suspense fallback={<LoadingSpinner />}>
        <LazyTopPanel />
      </Suspense>
      <Box sx={{ mt: 6, width: "100%" }}>
        <Suspense fallback={<LoadingSpinner />}>
          <LazyReminders />
        </Suspense>
      </Box>
    </ProviderUser>
  );
};

export default Home;
