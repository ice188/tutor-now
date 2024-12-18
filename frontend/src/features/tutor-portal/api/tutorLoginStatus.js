export const TutorLoginStatus = async () => {
    const serverUrl = import.meta.env.VITE_SERVER_API_URL;
    const token = localStorage.getItem("tutor-token");
    if (!token) {
      return { tutor: null, isLoggedIn: false };
    }
  
    const res = await fetch(`${serverUrl}/api/tutor/auth/status`, {
      method: "GET",
      credentials: "include",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    return data;
  };
  