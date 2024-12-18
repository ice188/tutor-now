import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { AvailabilityRequestPage } from "./pages/AvailabilityRequestPage";
import { LandingPage } from "./pages/LandingPage";
import { TutorialSessionPage } from "./pages/TutorialSessionPage";

const App = () => {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />

        <Route path="/register" element={<RegisterPage />} />
        <Route path="/:uid/availability-request" element={<AvailabilityRequestPage />} />
        <Route path="/tutorial-sessions-for-course/:id" element={<TutorialSessionPage />} />
      </Routes>
    </Router>
  );
};
export default App;
