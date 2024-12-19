export const GetCourseById = async (id) => {
    const serverUrl = import.meta.env.VITE_SERVER_API_URL;
    const res = await fetch(`${serverUrl}/api/course/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    return data.courses;
  };
  