/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";
import { GetTutorialsById } from "../api/getTutorialsById";
import { GetCourseById } from "../api/getCourseById";
import { GetTutorById } from "../api/getTutorById";

export default function TutorialList() {
  const { id } = useParams();
  const [selected, setSelected] = useState(null);
  const [tutorialById, setTutorialById] = useState([]);
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [tutorNames, setTutorNames] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selected) {
      navigate(`/`);
    } else {
      alert("Please select a tutorial first.");
    }
  };

  useEffect(() => {
    const fetchTutorNames = async () => {
      const names = {};
      for (let tutorial of tutorialById) {
        const tutor = await GetTutorById(tutorial.tutor_id);
        names[tutorial.tutor_id] = tutor.tutor_name;
      }
      setTutorNames(names);
    };
    if (tutorialById.length > 0) {
      fetchTutorNames();
    }
  }, [tutorialById]);


  useEffect(() => {
    const fetchTutorial = async () => {
      const fetchedTutorial = await GetTutorialsById(id);
      setTutorialById(fetchedTutorial);
      setSelected(fetchedTutorial[1]);
    };
    const fetchCourse = async () => {
      const course = await GetCourseById(id);
      setCourse(course);
    };
    fetchTutorial();
    fetchCourse();
  }, [id]);

  return (
    <div className="h-full">
      <div className="flex min-h-full flex-1 flex-col justify-center px-16 py-4 lg:px-8">
        <div>
          <h2 className="w-full mt-10 mb-4 text-center text-blue-950 text-2xl/9 font-bold tracking-tight">
            Choose the tutorial you would like to attend
          </h2>
        </div>
        <div className="space-y-4">
          {tutorialById.length > 0 && course ? (
            tutorialById.map((tutorial) => (
              <div
                key={tutorial.tutorial_id}
                className={`border p-4 rounded-md shadow-sm cursor-pointer hover:shadow-lg transition-all ${
                  selected?.tutorial_id === tutorial.tutorial_id
                    ? "bg-blue-100 border-blue-500"
                    : "bg-white"
                }`}
                onClick={() => setSelected(tutorial)}
              >
                <h3 className="font-semibold text-blue-950 text-xl pb-2">{course.course_code} - {course.course_name}</h3>
                <p className="text-sm text-gray-500">
                  Tutor: {tutorNames[tutorial.tutor_id]}
                </p>
                <p className="text-sm text-gray-500">
                  Scheduled Date: {tutorial.tutor_date}
                </p>
                <p className="text-sm text-gray-500">
                  Time: {tutorial.session_time}
                </p>
                <p className="text-sm text-gray-500">
                  Location: {tutorial.tutoring_location}
                </p>
                <p className="text-sm text-gray-500">
                  Capacity: {tutorial.capacity}
                </p>
                <p className="text-sm text-gray-500">
                  Spots Remaining: {tutorial.spots_remaining}
                </p>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">Loading tutorials...</p>
          )}
        </div>

        <div className="mt-3 flex items-center justify-center">
          <button
            type="submit"
            onClick={handleSubmit}
            className="mt-2 py-3 flex w-1/3 justify-center bg-blue-950 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-blue-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-900"
          >
            Make a booking
          </button>
        </div>
      </div>
    </div>
  );
}
