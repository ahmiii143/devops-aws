# Use an official Node.js runtime as a base image
FROM node:18-alpine

# Set the working directory to /app
WORKDIR /app

# Copy the current directory contents to /app
COPY package*.json ./

# Install app dependencies
RUN npm install


COPY . .

EXPOSE 5173

ENV VITE_API_ENDPOINT=https://backend-73ghfkcvpa-de.a.run.app

CMD [ "npm","run","dev" ]