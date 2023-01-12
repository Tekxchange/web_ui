import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MarketingPage from "./pages/marketingPage";

function App() {
  return (
    <>
      <Router>
        <main>
          <Navbar />
          <Routes>
            <Route path="/" element={<MarketingPage />} />
          </Routes>
        </main>
      </Router>
    </>
  );
}

export default App;
