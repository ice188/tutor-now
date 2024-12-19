export const UpdateTutorialCapacity= async (id) => {
    const serverUrl = import.meta.env.VITE_SERVER_API_URL;
    const res = await fetch(`${serverUrl}/api/tutorial/${id}/decrement-capacity`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      }
    });
    const data = await res.json();
    return data.tutorials;
  };
  