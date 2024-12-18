export const LoginStatus = async () => {
  const serverUrl = import.meta.env.VITE_SERVER_API_URL;
  const token = localStorage.getItem("token");
  if (!token) {
    return { user: null, isLoggedIn: false };
  }

  const res = await fetch(`${serverUrl}/api/user/status`, {
    method: "GET",
    credentials: "include",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  return data;
};
