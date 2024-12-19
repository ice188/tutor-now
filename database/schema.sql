CREATE DATABASE tutorDB;

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(200) NOT NULL
);

CREATE TABLE tutors (
    tutor_id SERIAL PRIMARY KEY,
    tutor_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    courses TEXT[] NOT NULL
);


CREATE TABLE courses (
    course_id SERIAL PRIMARY KEY,
    course_name VARCHAR(100) NOT NULL,
    course_code VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE tutorials (
    tutorial_id SERIAL PRIMARY KEY,
    tutoring_location VARCHAR(100) NOT NULL,
    tutor_id INT NOT NULL,
    course_id INT NOT NULL,
    capacity INT NOT NULL,
    spots_remaining INT NOT NULL,
    tutorial_time VARCHAR(100),
    session_time VARCHAR(50) NOT NULL,
    FOREIGN KEY (tutor_id) REFERENCES tutors(tutor_id),
    FOREIGN KEY (course_id) REFERENCES courses(course_id)
);

CREATE TABLE bookings (
    booking_id SERIAL PRIMARY KEY,
    user_id INT,
    tutorial_id INT NOT NULL,
    FOREIGN KEY (tutorial_id) REFERENCES tutorials(tutorial_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);
