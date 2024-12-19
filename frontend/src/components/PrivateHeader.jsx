import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { LoginStatus } from "../features/login/api/loginStatus";

export default function PrivateHeader() {
  
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
  };

  useEffect(() => {
    if (!token) {
      return;
    }

    const loadAuth = async () => {
      const { user } = await LoginStatus();

      setUser(user);
    };
    loadAuth();
  }, [token]);

  return  user ? (
    <header className="bg-white">
      <nav
        aria-label="Global"
        className="mx-auto border-b shadow-md flex pr-16 items-center justify-between p-3 pl-8 lg:px-8"
      >
        <div className="flex lg:flex-1 items-center justify-start">
          <a href="/" className="-m-1.5">
            <span className="sr-only">Tutor Now</span>
            <img alt="Tutor Now Logo" src="/logo.png" className="h-16 w-auto" />
          </a>
        </div>

        <div className="flex space-x-6 items-center">
          <a
            href={`/${user.user_id}/dashboard`}
            className="text-sm font-semibold text-blue-950 hover:text-blue-700"
          >
            Dashboard
          </a>
          
          <a
            href={`/${user.user_id}/availability-request`}
            className="text-sm font-semibold text-blue-950 hover:text-blue-700"
          >
            Availability Request
          </a>
          <a
            href={`/${user.user_id}/all-appointments`}
            className="text-sm font-semibold text-blue-950 hover:text-blue-700"
          >
            All Appointments
          </a>
          <button
            onClick={handleLogout}
            className="text-sm text-white bg-blue-950 px-5 py-2 font-semibold text-red-600 hover:bg-blue-700"
          >
            Logout
          </button>
        </div>
      </nav>
    </header>
  ) : (
    <div className="text-center pt-12">Loading...</div>
  )
}
