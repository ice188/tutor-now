import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginStatus } from "../features/login/api/loginStatus";

export default function PublicHeader() {
  const [isLoginPage, setIsLoginPage] = useState(false);
  const [user, setUser] = useState(null);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsLoginPage(window.location.pathname === "/login");
    }
  }, []);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

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
  return (
    <header className="bg-white">
      <nav
        aria-label="Global"
        className="mx-auto border-b shadow-md flex items-center justify-between p-3 pl-8 lg:px-8"
      >
        <div className="flex items-center">
          <a href="/" className="-m-1.5">
            <span className="sr-only">Tutor Now</span>
            <img alt="logo" src="/logo.png" className="h-16 w-auto" />
          </a>
        </div>

        {!isLoginPage && !token && (
          <div className="mr-8">
            <a
              href="/login"
              className="text-sm text-white bg-blue-950 px-5 py-3 font-semibold hover:bg-blue-700"
            >
              Login
            </a>
          </div>
        )}
        {!isLoginPage && token && (
          <div className="flex">
            <div className="mr-8">
              <a
                href= {`${user.user_id}/dashboard`}
                className="text-sm text-white bg-blue-950 px-5 py-3 font-semibold hover:bg-blue-700"
              >
                Dashboard
              </a>
            </div>
            <div className="mr-8">
              <button
                onClick={handleLogout}
                className="text-sm text-white bg-blue-950 px-5 py-3 font-semibold hover:bg-blue-700"
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
