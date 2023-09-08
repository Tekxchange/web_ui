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
import UnprotectedRoute from "@components/UnprotectedRoute";
import NotFound from "./pages/NotFound";
import { ToastContainer } from "react-toastify";

const MainApp = React.lazy(() => import("./pages/app.page"));
const PrivacyPage = React.lazy(() => import("./pages/privacy.page"));
const AccountRoutes = React.lazy(() => import("./pages/account.page"));

function App() {
  const dispatch = useAppDispatch();
  const { authModalOpen } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (localStorage.getItem("jwt")) dispatch(getUserInfo());
  }, []);

  return (
    <>
      <Router>
        <ReactTooltip id="tooltip" delayShow={1000} positionStrategy="fixed" style={{ zIndex: 1000 }} />
        <Navbar />
        <AuthModal open={authModalOpen} />
        <Routes>
          <Route path="/" element={<UnprotectedRoute render={MarketingPage} />} />
          <Route
            path="/app/*"
            element={
              <React.Suspense fallback={<FullPageLoading />}>
                <UnprotectedRoute render={MainApp} />
              </React.Suspense>
            }
          />
          <Route
            path="/privacy"
            element={
              <React.Suspense fallback={<FullPageLoading />}>
                <UnprotectedRoute render={PrivacyPage} />
              </React.Suspense>
            }
          />
          <Route
            path="/account/*"
            element={
              <React.Suspense fallback={<FullPageLoading />}>
                <ProtectedRoute protect={AccountRoutes} />
              </React.Suspense>
            }
          />
          <Route
            path="*"
            element={
              <React.Suspense fallback={<FullPageLoading />}>
                <NotFound />
              </React.Suspense>
            }
          />
        </Routes>
        <Footer />
        <ToastContainer position="bottom-center" pauseOnHover autoClose={1500} limit={2} />
      </Router>
    </>
  );
}

export default App;
