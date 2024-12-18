import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { AvailabilityRequestPage } from "./pages/AvailabilityRequestPage";
import { LandingPage } from "./pages/LandingPage";
import { TutorialSessionPage } from "./pages/TutorialSessionPage";
import { DashboardPage } from "./pages/DashboardPage";
import { MakeBookingPage } from "./pages/MakeBookingPage";
import { ReserveBookingPage } from "./pages/ReserveBookingPage";
import { TutorLoginPage } from "./pages/TutorLoginPage";

const App = () => {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />

        <Route path="/register" element={<RegisterPage />} />
        <Route path="/:uid/availability-request" element={<AvailabilityRequestPage />} />
        <Route path="/tutorial-sessions-for-course/:id" element={<TutorialSessionPage />} />
        <Route path="/:uid/dashboard" element= {<DashboardPage />} />
        <Route path="/:tid/make-booking" element= {<MakeBookingPage />} />
        <Route path="/reserve-booking/:id" element= {<ReserveBookingPage />} />
        <Route path="/tutor-login" element= {<TutorLoginPage />} />
      </Routes>
    </Router>
  );
};
export default App;
