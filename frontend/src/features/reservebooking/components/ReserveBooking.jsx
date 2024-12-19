import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GetTutorialByTid } from "../api/getTutorialByTid";
import { GetCourseById } from "../api/getCourseById";
import { GetTutorById } from "../api/getTutorById";
import CryptoJS from "crypto-js";
import {UpdateTutorialCapacity} from "../api/updateTutorialCapacity";
import { LoginStatus } from "../../login/api/loginStatus";

export default function TutorialDetails() {
  const { encodedId } = useParams(); 
  const decodedId = decodeURIComponent(encodedId); 
  const [tutorial, setTutorial] = useState(null);
  const [course, setCourse] = useState(null);
  const [user, setUser] = useState(null);
  const [tutor, setTutor] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      return;
    }

    const loadAuth = async () => {
      const { user } = await LoginStatus();

      setUser(user);
    };
    loadAuth();
  }, [token]);

  const decryptId = (encryptedId) => {
    const key = "secret-key"; 
    try {
      const bytes = CryptoJS.AES.decrypt(encryptedId, key);
      const decryptedId = bytes.toString(CryptoJS.enc.Utf8);
      if (!decryptedId) {
        throw new Error("Failed to decrypt ID");
      }
      return decryptedId;
    } catch (error) {
      console.error("Error during decryption:", error);
      return null;
    }
  };

  useEffect(() => {
    console.log("Encoded ID from URL:", encodedId);
    const decryptedId = decryptId(decodedId); 
    console.log("Decrypted ID:", decryptedId); 
  
    if (!decryptedId) {
      console.error("Invalid or failed to decrypt tutorial ID.");
      return;
    }
  
    //convert decrypted ID to an int so it can be used in api call
    const tutorialId = parseInt(decryptedId.trim(), 10);
    if (isNaN(tutorialId)) {
      console.error("Decrypted ID is not a valid number.");
      return;
    }
  
    console.log("Fetching tutorial with ID:", tutorialId);
  
    const fetchTutorialDetails = async () => {
      try {
        const fetchedTutorial = await GetTutorialByTid(tutorialId); 
        console.log("Fetched tutorial:", fetchedTutorial); //logging for testing purposes
  3
        if (fetchedTutorial.length === 0) {
          console.error("Tutorial not found.");
          return;
        }
        setTutorial(fetchedTutorial);
        const fetchedCourse = await GetCourseById(fetchedTutorial.course_id);
        setCourse(fetchedCourse);
        const fetchedTutor = await GetTutorById(fetchedTutorial.tutor_id);
        setTutor(fetchedTutor);
      } catch (error) {
        console.error("Error fetching tutorial details:", error);
      }
    };
  
    fetchTutorialDetails();
  }, [decodedId]); 
  
  const handleConfirmReservation = async () => {
    if (!tutorial) {
      alert("Failed to confirm reservation. Please try again.");
      return;
    }
  
    if (tutorial.spots_remaining <= 0) {
      alert("This tutorial is fully booked. No spots are available.");
      return;
    }
  
    try {
      await UpdateTutorialCapacity(tutorial.tutorial_id); //reduces capacity by 1
      alert(`You have confirmed a reservation for the tutorial: ${tutorial.tutorial_id}`);
    } catch (error) {
      console.log(error);
      alert("Failed to confirm reservation. Please try again later.");
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
