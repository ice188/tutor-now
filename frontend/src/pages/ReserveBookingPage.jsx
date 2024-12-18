
import PublicHeader from "../components/PublicHeader";
import ReserveBooking from "../features/reservebooking/components/ReserveBooking";
import { LoginPage } from "./LoginPage";
import { useState, useEffect } from "react";
import { LoginStatus } from "../features/login/api/loginStatus";

export const ReserveBookingPage = () => {
  const token = localStorage.getItem("token");
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!token) {
      return;
    }

    const loadAuth = async () => {
      try {
      const { user } = await LoginStatus();
      setUser(user);

    }catch(e){
      setUser(null);
      console.log(e);
    }
    };
    loadAuth();
  }, [token]);

  return user ? (

    <>
      <PublicHeader />
      <ReserveBooking />
    </>
  ) : (
    <LoginPage/>
  );

};
