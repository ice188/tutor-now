import PublicHeader from "../components/PublicHeader";
import ReserveBooking from "../features/reservebooking/components/ReserveBooking";
import { LoginPage } from "./LoginPage";
import { useState, useEffect } from "react";
import { LoginStatus } from "../features/login/api/loginStatus";

export const ReserveBookingPage = () => {
  const [user, setUser] = useState(null);
  sessionStorage.removeItem("redirect_url");

  useEffect(() => {

    const loadAuth = async () => {
      try {
        const { user } = await LoginStatus();
        setUser(user);
      } catch (e) {
        setUser(null);
        console.log(e);
      }
      console.log(user);
      if (!user) {
        sessionStorage.setItem("redirect_url", window.location.href.toString());
      }
    };
    loadAuth();
  }, []);

  
  return user ? (
    <>
      <PublicHeader />
      <ReserveBooking />
    </>
  ) : (
    <LoginPage />
  );
};
