import { useState, useEffect } from "react";
import { addTutorial } from "../api/addTutorial";
import { GetCourses } from "../api/getCourses"; // Reuse the existing API function
import { useParams } from "react-router-dom";



const MakeBookingPage = () => {
  const { tid } = useParams();
  const [formData, setFormData] = useState({
    tutoring_location: "",
    tutor_id: tid,
    course_id: "", // Set from dropdown
    capacity: "",
    tutorial_date: "",
    session_time_start: "", // Start time
    session_time_end: "",   // End time
    recurring: "one-time", // Default value
  });

  const [courses, setCourses] = useState([]); // Store fetched courses

  // Fetch courses on component mount
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const fetchedCourses = await GetCourses(); // Reuse the existing function
        setCourses(fetchedCourses);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };
    fetchCourses();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Combine start and end times into a single range
    const session_time = `${formData.session_time_start}-${formData.session_time_end}`;
  
    // Prepare the payload
    const dataToSubmit = {
      location: formData.tutoring_location,
      tid: tid,
      cid: parseInt(formData.course_id),
      capacity: parseInt(formData.capacity),
      spots: parseInt(formData.capacity), // Match spots_remaining to capacity
      tutor_date: formData.tutorial_date, // Ensure field names match the database
      time: session_time,
      frequency: formData.recurring,
    };
  
    console.log(dataToSubmit);
    try {
      const result = await addTutorial(dataToSubmit);
      alert(result.message || "Tutorial added successfully!");
      setFormData({
        tutoring_location: "",
        course_id: "",
        capacity: "",
        tutorial_date: "",
        session_time_start: "",
        session_time_end: "",
        recurring: "one-time",
      });
    } catch (error) {
      console.log(error);
      alert("Failed to add tutorial. Please try again.");
    }
  };
  

  const formStyle = {
    backgroundColor: "#F9FAFB",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    maxWidth: "600px",
    margin: "0 auto",
  };

  const inputStyle = {
    display: "block",
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    borderRadius: "4px",
    border: "1px solid #D1D5DB",
  };


  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ textAlign: "center", color: "#0A2A3A" }}>Add a Tutorial</h2>
      <form style={formStyle} onSubmit={handleSubmit}>
        <label>Tutoring Location:</label>
        <input
          type="text"
          name="tutoring_location"
          value={formData.tutoring_location}
          onChange={handleInputChange}
          style={inputStyle}
          required
        />

        <label>Course:</label>
        <select
          name="course_id"
          value={formData.course_id}
          onChange={handleInputChange}
          style={inputStyle}
          required
        >
          <option value="">Select a Course</option>
          {courses.map((course) => (
            <option key={course.course_id} value={course.course_id}>
              {course.course_code} - {course.course_name}
            </option>
          ))}
        </select>

        <label>Capacity:</label>
        <input
          type="number"
          name="capacity"
          value={formData.capacity}
          onChange={handleInputChange}
          style={inputStyle}
          required
        />

        <label>Scheduled Date:</label>
        <input
          type="date"
          name="tutorial_date"
          value={formData.tutorial_date}
          onChange={handleInputChange}
          style={inputStyle}
          required
        />

        <label>Session Start Time:</label>
        <input
          type="time"
          name="session_time_start"
          value={formData.session_time_start}
          onChange={handleInputChange}
          style={inputStyle}
          required
        />

        <label>Session End Time:</label>
        <input
          type="time"
          name="session_time_end"
          value={formData.session_time_end}
          onChange={handleInputChange}
          style={inputStyle}
          required
        />

        <label>Recurring:</label>
        <select
          name="recurring"
          value={formData.recurring}
          onChange={handleInputChange}
          style={inputStyle}
          required
        >
          <option value="one-time">One-Time</option>
          <option value="recurring">Recurring</option>
        </select>

        <button type="submit" className="bg-blue-950 text-white px-5 py-3 font-semibold rounded-md cursor-pointer hover:bg-blue-700">
          Add Tutorial
        </button>
      </form>
    </div>
  );
};

export default MakeBookingPage;
