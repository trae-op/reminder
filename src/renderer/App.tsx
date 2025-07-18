import { lazy, Suspense } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import { MainLayout } from "@layouts/Main";
import { PublicRoute } from "@ui-composites/PublicRoute";
import { PrivateRoute } from "@ui-composites/PrivateRoute";
import { LoadingSpinner } from "@components/LoadingSpinner";
import { ProviderAuth } from "@ui-business/Auth";
import { FormRemindersLayout } from "@layouts/FormReminders";

const LazyHomeWindow = lazy(() => import("./windows/home/Home"));
const LazyUpdaterWindow = lazy(() => import("./windows/updater/Updater"));
const LazyAddReminderWindow = lazy(() => import("./windows/AddReminder"));
const LazyUpdateReminderWindow = lazy(() => import("./windows/UpdateReminder"));
const LazyLogInWindow = lazy(() => import("./windows/logIn/LogIn"));
const LazyConfirmDeleteReminderWindow = lazy(
  () => import("./windows/confirmDeleteReminder/Confirm")
);

export const App = () => {
  return (
    <ProviderAuth>
      <HashRouter>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route element={<MainLayout />}>
              <Route element={<PublicRoute />}>
                <Route path="/sign-in" element={<LazyLogInWindow />} />
              </Route>
              <Route element={<PrivateRoute />}>
                <Route path="/window:main" element={<LazyHomeWindow />} />
              </Route>
              <Route element={<FormRemindersLayout />}>
                <Route
                  path="/window/reminder/add"
                  element={<LazyAddReminderWindow />}
                />
                <Route
                  path="/window/reminder/update/:id"
                  element={<LazyUpdateReminderWindow />}
                />
              </Route>
              <Route
                path="/window/reminder/delete/:id"
                element={<LazyConfirmDeleteReminderWindow />}
              />
              <Route
                path="/window:update-app"
                element={<LazyUpdaterWindow />}
              />
            </Route>
          </Routes>
        </Suspense>
      </HashRouter>
    </ProviderAuth>
  );
};
