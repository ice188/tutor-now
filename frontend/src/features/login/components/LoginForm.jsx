import { useState } from "react";
import { Login } from "../api/login";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const emailPattern = /^[a-zA-Z0-9._%+-]+@(mcgill\.ca|mail\.mcgill\.ca)$/;

    if (!emailPattern.test(email)) {
      setError("Please use a valid McGill email address.");
      return;
    }

    const res = await Login(email, password);

    if (res.status === 401) {
      setError("Invalid credentials. Please try again.");
    } else if (res.status === 200) {
      const data = await res.json();
      localStorage.setItem("token", data.token);
      setError("");
      navigate("/");
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-4 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Sign in to your account
          </h2>
          {error && (
            <p className="mt-4 -mb-4 text-center text-sm font-medium text-red-600">
              {error}
            </p>
          )}
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleLogin} method="POST" className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  pattern="^[a-zA-Z0-9._%+-]+@(mcgill\.ca|mail\.mcgill\.ca)$"
                  autoComplete="email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError("");
                  }}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError("");
                  }}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-blue-950 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-blue-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-900"
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm/6 text-gray-500">
            Not a member?{" "}
            <a
              href="/register"
              className="font-semibold text-blue-950 hover:text-blue-900"
            >
              Register Here
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
