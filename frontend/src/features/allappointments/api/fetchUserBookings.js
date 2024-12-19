export const FetchUserBookings = async () => {
  const serverUrl = import.meta.env.VITE_SERVER_API_URL;
  const token = localStorage.getItem("token");
  const res = await fetch(`${serverUrl}/api/bookings`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch user bookings");
  }
  return await res.json(); // Returns an array of bookings
};
