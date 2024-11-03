-- Ensure the table exists with only the necessary fields
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);
-- Insert example data to match server expectations
INSERT INTO users (username, password)
VALUES ('exampleUser', 'examplePassword');