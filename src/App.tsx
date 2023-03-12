import Navbar from "@components/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MarketingPage from "./pages/marketingPage";
import Footer from "@components/Footer";
import React from "react";
import FullPageLoading from "@components/FullPageLoading";
import { useRecoilState } from "recoil";
import { authSlice } from "@atoms/auth";
import AuthModal from "@components/AuthModal";

const MainApp = React.lazy(() => import("./pages/app"));

function App() {
  const [{ authModalOpen }] = useRecoilState(authSlice);

  return (
    <>
      <Router>
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
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
