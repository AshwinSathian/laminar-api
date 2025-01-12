# Use the official Node.js image as a base
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of the application files
COPY . .

# Install Nest CLI
RUN npm install -g @nestjs/cli

# Build the application
RUN npm run build

# Expose the port
EXPOSE 3000

# ENV variables
ARG MONGO_URL
ARG AWS_REGION
ARG AWS_ACCESS_KEY_ID
ARG AWS_SECRET_ACCESS_KEY
ARG S3_BUCKET_NAME

# Start the application
CMD ["npm", "start:prod"]
