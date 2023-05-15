# Use the official Node.js runtime as a parent image
FROM node:16

# Set the working directory to /api
WORKDIR /api

# Copy package.json and package-lock.json into the container at /app
COPY package*.json ./

# Install any needed packages
RUN npm ci

# Copy the rest of the application source code into the container at /app
COPY . .

# Install ts-node and TypeScript globally
RUN npm install -g ts-node typescript

RUN npx prisma migrate
RUN npx prisma generate

# Expose the port your application will run on (change this if necessary)
EXPOSE 4000

# Run your TypeScript application using ts-node
CMD ["ts-node", "src/index.ts"]
