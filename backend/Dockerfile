# ElderCare-DocAssist Backend
# Simple Dockerfile for student project

FROM node:18-alpine

# Install Python and build tools (needed for Whisper)
RUN apk add --no-cache python3 py3-pip build-base

WORKDIR /app

# Copy package files (when you have them)
# COPY package*.json ./
# RUN npm install

# Copy backend code
COPY . .

# Expose API port
EXPOSE 3000

# Start command (update when you have actual server)
CMD ["node", "index.js"]
