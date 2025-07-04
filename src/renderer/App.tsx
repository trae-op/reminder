import { lazy, Suspense } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import { MainLayout } from "@layouts/Main";
import { PublicRoute } from "@ui-composites/PublicRoute";
import { PrivateRoute } from "@ui-composites/PrivateRoute";
import { LoadingSpinner } from "@components/LoadingSpinner";
import { ProviderAuth } from "@ui-business/Auth";

const LazyHomeWindow = lazy(() => import("./windows/home/Home"));
const LazyUpdaterWindow = lazy(() => import("./windows/updater/Updater"));
const LazyLogInWindow = lazy(() => import("./windows/logIn/LogIn"));

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
