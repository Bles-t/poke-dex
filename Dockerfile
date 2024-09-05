# Stage 1: Build the React app
FROM node:18 as build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app's source code
COPY  . .

# Build the React app
RUN npm run build

# Stage 2: Serve the React app with Nginx
FROM nginx:alpine

# Copy the build files to the Nginx web directory
COPY --from=build /app/build /usr/share/nginx/html

# Copy the default Nginx server block configuration file
COPY default.conf /etc/nginx/conf.d/default.conf

# Expose port 80 to the outside world
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
