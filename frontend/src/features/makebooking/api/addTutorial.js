export const addTutorial = async (tutorialData) => {
  try {
    console.log(JSON.stringify(tutorialData));
    const serverUrl = import.meta.env.VITE_SERVER_API_URL;
    const response = await fetch(`${serverUrl}/api/tutorial`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tutorialData),
    });

    if (!response.ok) {
      throw new Error("Failed to add tutorial");
    }

    const result = await response.json();
    return result; // { message: "Tutorial added", tutorial: { ... } }
  } catch (error) {
    console.error("Error in addTutorial API:", error);
    throw error;
  }
};
