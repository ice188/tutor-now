export const GetTutorById = async (id) => {
    const serverUrl = import.meta.env.VITE_SERVER_API_URL;
    const res = await fetch(`${serverUrl}/api/tutor/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    return data.tutor;
  };
  