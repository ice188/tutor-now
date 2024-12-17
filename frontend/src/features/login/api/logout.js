export const Logout = async () => {
    const serverUrl = import.meta.env.VITE_SERVER_API_URL;
    await fetch(`${serverUrl}/api/user/logout`, {
      method: "POST",
      credentials: "include",
    });
};
  