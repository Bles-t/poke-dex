-- Ensure the table exists with only the necessary fields
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);
-- Insert example data to match server expectations
INSERT INTO users (username, password)
VALUES ('exampleUser', 'examplePassword');


-- need to have the tables created before actally conmecting to the sevrer

-- need to cretae table before sevre connect .

-- option 1 i can create the table in a different service that is not my service or cleint th at cna use javascript to conect to my data base.

-- or have my server creta  the tables if they dont exist before spping up my routes 

-- last thing should be spinning up the server 