import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { AvailabilityRequestPage } from "./pages/AvailabilityRequestPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route path="/register" element={<RegisterPage />} />
        <Route path="/time-request" element={<AvailabilityRequestPage />} />
      </Routes>
    </Router>
  );
};
export default App;
