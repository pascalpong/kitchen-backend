# Use an official Node.js runtime as the base image
FROM node:18.17.0

# Set the working directory in the Docker container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the application dependencies
RUN npm install

# If you are building your code for production
# RUN npm ci --only=production

# Bundle the application source inside the Docker container
COPY . .

# Copy the start script
COPY start.sh .

# Make the start script executable
RUN chmod +x start.sh

# Expose port 8080 for the application
EXPOSE 8080

# Define the command to run the application
CMD ["./start.sh"]