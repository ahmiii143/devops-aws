# Use an official Node.js runtime as a base image
FROM node:18-alpine

# Set the working directory to /app
WORKDIR /app

# Copy the current directory contents to /app
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port on which the backend will run
EXPOSE 3000

# Set environment variables
ENV PORT=3000
ENV MONGO_URI="mongodb+srv://levor47929:CUsb7ZXfJONrMXqp@cluster0.gx6rxbc.mongodb.net/attendanceWebApp?retryWrites=true&appName=Cluster0"


# Command to run the backend server
CMD ["npm", "run", "dev"]