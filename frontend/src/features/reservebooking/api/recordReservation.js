export const RecordReservation = async (uid, tid) => {
  const serverUrl = import.meta.env.VITE_SERVER_API_URL;
  const res = await fetch(`${serverUrl}/api/booking`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ tid: tid, uid: uid }), 
  });

  if (!res.ok) {
    throw new Error("Failed to create booking");
  }

  const data = await res.json();
  return data.booking;
};
