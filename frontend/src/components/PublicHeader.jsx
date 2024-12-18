import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginStatus } from "../features/login/api/loginStatus";
import { TutorLoginStatus } from "../features/tutor-portal/api/TutorLoginStatus";

export default function PublicHeader() {
  const [isLoginPage, setIsLoginPage] = useState(false);
  const [user, setUser] = useState(null);
  const [tutor, setTutor] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsLoginPage(window.location.pathname === "/login");
    }
  }, []);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const tutorToken = localStorage.getItem("tutor-token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
  };

  const handleTutorLogout = () => {
    localStorage.removeItem("tutor-token");
    setTutor(null);
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

  useEffect(() => {
    if (!tutorToken) {
      return;
    }
    const loadAuth = async () => {
      const { tutor } = await TutorLoginStatus();
      setTutor(tutor);
    };
    loadAuth();
  }, [tutorToken]);
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
        <div className="flex justify-end items-end">
          {!isLoginPage && !token && !tutorToken && (
            <div className="mr-8">
              <a
                href="/tutor-login"
                className="text-sm text-blue-950 text-decoration-line: underline px-5 py-3 font-semibold hover:text-blue-600"
              >
                Tutor portal
              </a>
            </div>
          )}
          {tutorToken && tutor && !token && (
            <div className="flex items-center">
              <div className="mr-8">
                <a
                  href={`/${tutor.tutor_id}/make-booking`}
                  className="text-sm text-blue-950 text-decoration-line: underline px-5 py-3 font-semibold hover:text-blue-700"
                >
                  Create a Tutoring Session
                </a>
              </div>
              <div className="mr-8">
                <button
                  onClick={handleTutorLogout}
                  className="text-sm text-white bg-blue-950 px-5 py-3 font-semibold hover:bg-blue-700"
                >
                  Logout
                </button>
              </div>
            </div>
          )}
          {!isLoginPage && !token && !tutorToken && (
            <div className="mr-8">
              <a
                href="/login"
                className="text-sm text-white bg-blue-950 px-5 py-3 font-semibold hover:bg-blue-700"
              >
                User Login
              </a>
            </div>
          )}
        </div>
        {!isLoginPage &&
          token &&
          user &&
          !tutorToken && (
            <div className="flex items-center">
              <div className="mr-8">
                <a
                  href={`/${user.user_id}/dashboard`}
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
