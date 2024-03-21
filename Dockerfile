# Dockerfile for React frontend

# Use the official Node.js image
FROM node:16

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all project files
COPY . .

# Build the React application
RUN npm run build

# # Expose port 3000 for interaction with the application
# EXPOSE 3000

# Command to start the application
CMD ["npm", "start"]