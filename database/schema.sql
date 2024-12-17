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

