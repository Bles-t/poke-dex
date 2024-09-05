# Use an official Node.js runtime as the base image
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY ../../package*.json ./

# Install the application dependencies
RUN npm install

# Copy the server code to the container
COPY ./src/server /app/src/server


# Set the working directory to where the server code is located
WORKDIR /app/src/server


# Expose the port the server will run on
EXPOSE 5005

# Command to run the server
CMD ["node", "server.js"]
