export const RecordReservation= async (uid, tid) => {
    const serverUrl = import.meta.env.VITE_SERVER_API_URL;
    const res = await fetch(`${serverUrl}/api/booking`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      }
    });
    const data = await res.json();
    return data.tutorials;
  };
  