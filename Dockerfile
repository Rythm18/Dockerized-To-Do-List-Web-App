# Use an official Node.js runtime as a parent image
FROM node:14-alpine

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to /app
COPY package*.json ./

# Install the dependencies defined in package.json
RUN npm install

# Copy the rest of the application files to /app
COPY . .

# Expose port 3000 for the web server
EXPOSE 3000

# Start the Node.js application
CMD ["npm", "start"]
