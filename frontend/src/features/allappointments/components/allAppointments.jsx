import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GetTutorialsById } from "../api/getTutorialsById";
import { GetCourseById } from "../api/getCourseById";
import { GetTutorById } from "../api/getTutorById";
import { FetchUserBookings } from "../api/fetchUserBookings";
import { GetTutorialByTid } from "../api/getTutorialByTid";

export default function AllAppointments() {
  const { uid } = useParams(); 
  const [tutorials, setTutorials] = useState([]);
  const [courseDetails, setCourseDetails] = useState({});
  const [tutorNames, setTutorNames] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookingsAndDetails = async () => {
      try {
        console.log("Fetching bookings for user:", uid);
        const response = await FetchUserBookings(uid);
        const bookings = response.bookings; // Access the 'bookings' array from the response
        console.log("Fetched Bookings:", bookings);
    
        const tutorialDetails = [];
        const courseCache = {};
        const tutorCache = {};
    
        // Now iterate over the bookings array
        for (const booking of bookings) {
          console.log("Booking:", booking); // Log the booking object to check tutorial_id
    
          if (!booking.tutorial_id) {
            console.error("Missing tutorial_id in booking:", booking);
            continue; // Skip this booking if no tutorial_id is available
          }
    
          const tutorial = await GetTutorialByTid(booking.tutorial_id);
          console.log("Fetched Tutorial:", tutorial);
    
          if (!tutorial || !tutorial.course_id || !tutorial.tutor_id) {
            console.error("Missing tutorial details:", tutorial);
            continue; // Skip this tutorial if required details are missing
          }
    
          tutorialDetails.push(tutorial);
    
          if (!courseCache[tutorial.course_id]) {
            const course = await GetCourseById(tutorial.course_id);
            console.log("Fetched Course:", course);
            if (course) {
              courseCache[tutorial.course_id] = course;
            } else {
              console.error("Failed to fetch course with id:", tutorial.course_id);
            }
          }
    
          if (!tutorCache[tutorial.tutor_id]) {
            const tutor = await GetTutorById(tutorial.tutor_id);
            console.log("Fetched Tutor:", tutor);
            if (tutor) {
              tutorCache[tutorial.tutor_id] = tutor;
            } else {
              console.error("Failed to fetch tutor with id:", tutorial.tutor_id);
            }
          }
        }
    
        setTutorials(tutorialDetails);
        setCourseDetails(courseCache);
        setTutorNames(tutorCache);
      } catch (error) {
        console.error("Error fetching bookings or tutorial details:", error);
      } finally {
        setLoading(false);
      }
    };
    
    
  
    fetchBookingsAndDetails();
  }, [uid]);

  if (loading) {
    return <p className="text-center text-gray-500">Loading booked tutorials...</p>;
  }

  return (
    <div className="h-full">
      <div className="flex min-h-full flex-1 flex-col justify-center px-16 py-4 lg:px-8">
        <h2 className="w-full mt-10 mb-4 text-center text-blue-950 text-2xl font-bold tracking-tight">
          Your Booked Tutorials
        </h2>
        <div className="space-y-4">
          {tutorials.length > 0 ? (
            tutorials.map((tutorial) => (
              <div key={tutorial.tutorial_id} className="border p-4 rounded-md shadow-sm">
                <h3 className="font-semibold text-blue-950 text-xl pb-2">
                  {courseDetails[tutorial.course_id]?.course_code} - {courseDetails[tutorial.course_id]?.course_name}
                </h3>
                <p className="text-sm text-gray-500">
                  Tutor: {tutorNames[tutorial.tutor_id]?.tutor_name}
                </p>
                <p className="text-sm text-gray-500">Scheduled Date: {tutorial.tutor_date}</p>
                <p className="text-sm text-gray-500">Time: {tutorial.session_time}</p>
                <p className="text-sm text-gray-500">Location: {tutorial.tutoring_location}</p>
                <p className="text-sm text-gray-500">Capacity: {tutorial.capacity}</p>
                <p className="text-sm text-gray-500">Spots Remaining: {tutorial.spots_remaining}</p>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No tutorials booked yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
