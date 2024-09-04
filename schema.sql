CREATE DATABASE greenthumb_hub;

CREATE TABLE User (
    user_id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Plant (
    plant_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES User(user_id),
    name VARCHAR(255) NOT NULL,
    species VARCHAR(255) NOT NULL,
    description TEXT,
    care_instructions TEXT,
    last_watered TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Reminder (
    reminder_id SERIAL PRIMARY KEY,
    plant_id INT REFERENCES Plant(plant_id),
    reminder_type VARCHAR(50) NOT NULL,
    reminder_date TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Weather_Data (
    weather_data_id SERIAL PRIMARY KEY,
    location VARCHAR(255) NOT NULL,
    temperature FLOAT,
    humidity FLOAT,
    precipitation FLOAT,
    date TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);