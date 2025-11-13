# ElderCare Frontend - Dockerfile
# configuration

FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package.json ./

# Install dependencies
RUN npm install

# Copy all frontend code
COPY . .

# Expose port 3001 (frontend runs on different port than backend)
EXPOSE 3001

# Set environment variable for React
ENV PORT=3001

# Start development server
CMD ["npm", "start"]
