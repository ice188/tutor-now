//Alice Chu, 261014447
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

import {  useParams } from "react-router-dom";
import { GetTutorialsById } from "../api/getTutorialsById";
import { GetCourseById } from "../api/getCourseById";
import { GetTutorById } from "../api/getTutorById";

export default function TutorialList() {
  const { id } = useParams();
  const [selected, setSelected] = useState(null);
  const [tutorialById, setTutorialById] = useState([]);
  const [course, setCourse] = useState(null);
  const [tutorNames, setTutorNames] = useState({});

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
            List of Tutorials
          </h2>
          <p className="text-gray-600 text-sm pb-4">
            This page is for showing all the available sessions only. To reserve a session, please use the link that the tutor send to you.
          </p>
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
                <p className="text-sm text-gray-500">
                  Frequency: {tutorial.frequency}
                </p>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">Loading tutorials...</p>
          )}
        </div>

        
      </div>
    </div>
  );
}
