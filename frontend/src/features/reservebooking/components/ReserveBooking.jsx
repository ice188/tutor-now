import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GetTutorialsById } from "../api/getTutorialsById";
import { GetCourseById } from "../api/getCourseById";
import { GetTutorById } from "../api/getTutorById";

export default function TutorialDetails() {
  const { id } = useParams(); // Get the tutorial ID from the URL
  const [tutorial, setTutorial] = useState(null);
  const [course, setCourse] = useState(null);
  const [tutor, setTutor] = useState(null);
  const navigate = useNavigate();

  // Fetch tutorial, course, and tutor details based on tutorial ID
  useEffect(() => {
    const fetchTutorialDetails = async () => {
      try {
        const fetchedTutorial = await GetTutorialsById(id);
        setTutorial(fetchedTutorial[0]); // Assuming the tutorial is the first item in the array
        const fetchedCourse = await GetCourseById(fetchedTutorial[0].course_id);
        setCourse(fetchedCourse);
        const fetchedTutor = await GetTutorById(fetchedTutorial[0].tutor_id);
        setTutor(fetchedTutor);
      } catch (error) {
        console.error("Error fetching tutorial details:", error);
      }
    };

    fetchTutorialDetails();
  }, [id]);

  const handleConfirmReservation = () => {
    if (tutorial) {
      alert(`You have confirmed a reservation for the tutorial: ${tutorial.tutorial_id}`);
      navigate("/dashboard"); 
    } else {
      alert("Failed to confirm reservation. Please try again.");
    }
  };

  if (!tutorial || !course || !tutor) {
    return <p>Loading tutorial details...</p>; 
  }

  return (
    <div className="h-full">
      <div className="flex min-h-full flex-1 flex-col justify-center px-16 py-4 lg:px-8">
        <div>
          <h2 className="w-full mt-10 mb-4 text-center text-blue-950 text-2xl font-bold tracking-tight">
            Tutorial Details
          </h2>
        </div>
        <div className="space-y-4">
          <div className="border p-4 rounded-md shadow-sm">
            <h3 className="font-semibold text-blue-950 text-xl pb-2">
              {course.course_code} - {course.course_name}
            </h3>
            <p className="text-sm text-gray-500">
              <strong>Tutor:</strong> {tutor.tutor_name}
            </p>
            <p className="text-sm text-gray-500">
              <strong>Scheduled Date:</strong> {tutorial.tutor_date}
            </p>
            <p className="text-sm text-gray-500">
              <strong>Time:</strong> {tutorial.session_time}
            </p>
            <p className="text-sm text-gray-500">
              <strong>Location:</strong> {tutorial.tutoring_location}
            </p>
            <p className="text-sm text-gray-500">
              <strong>Capacity:</strong> {tutorial.capacity}
            </p>
            <p className="text-sm text-gray-500">
              <strong>Spots Remaining:</strong> {tutorial.spots_remaining}
            </p>
          </div>
        </div>

        <div className="mt-3 flex items-center justify-center">
          <button
            onClick={handleConfirmReservation}
            className="mt-2 py-3 flex w-1/3 justify-center bg-blue-950 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-900"
          >
            Confirm Reservation
          </button>
        </div>
      </div>
    </div>
  );
}
