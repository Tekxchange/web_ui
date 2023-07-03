import Navbar from "@components/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MarketingPage from "./pages/marketing.page";
import Footer from "@components/Footer";
import React, { useEffect } from "react";
import FullPageLoading from "@components/FullPageLoading";
import AuthModal from "@components/AuthModal";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { useAppDispatch, useAppSelector } from "./state";
import { getUserInfo } from "@state/auth";
import ProtectedRoute from "@components/ProtectedRoute";

const MainApp = React.lazy(() => import("./pages/app.page"));
const PrivacyPage = React.lazy(() => import("./pages/privacy.page"));
const AccountRoutes = React.lazy(() => import("./pages/account.page"));

function App() {
  const dispatch = useAppDispatch();
  const { authModalOpen } = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getUserInfo());
  }, []);

  return (
    <>
      <Router>
        <ReactTooltip
          id="tooltip"
          delayShow={1000}
          positionStrategy="fixed"
          style={{ zIndex: 1000 }}
        />
        <Navbar />
        <AuthModal open={authModalOpen} />
        <Routes>
          <Route path="/" element={<MarketingPage />} />
          <Route
            path="/app/*"
            element={
              <React.Suspense fallback={<FullPageLoading />}>
                <MainApp />
              </React.Suspense>
            }
          />
          <Route
            path="/privacy"
            element={
              <React.Suspense fallback={<FullPageLoading />}>
                <PrivacyPage />
              </React.Suspense>
            }
          />
          <Route
            path="/account/*"
            element={
              <React.Suspense fallback={<FullPageLoading />}>
                <ProtectedRoute>
                  <AccountRoutes user={undefined as never} />
                </ProtectedRoute>
              </React.Suspense>
            }
          />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
