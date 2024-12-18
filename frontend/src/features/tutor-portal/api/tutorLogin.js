export const TutorLogin = async (email, password) => {
    const serverUrl = import.meta.env.VITE_SERVER_API_URL;
    const res = await fetch(`${serverUrl}/api/tutor/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
      credentials: "include",
    });
    return res;
  };
  