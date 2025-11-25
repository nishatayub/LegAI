# Server Dockerfile
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy application code
COPY . .

# Expose port (will be overridden by PORT env var)
EXPOSE 8080

# Start application
CMD ["npm", "start"]




