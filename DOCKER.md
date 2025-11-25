# Docker Setup for LegAI

This guide explains how to run the entire LegAI application using Docker.

## Prerequisites

- Docker Desktop installed ([Download](https://www.docker.com/products/docker-desktop))
- Docker Compose (included with Docker Desktop)

## Quick Start

1. **Clone and navigate to project:**
   ```bash
   cd /path/to/LegAI
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.docker .env
   ```
   The `.env.docker` file already contains all necessary values.

3. **Start the application:**
   ```bash
   docker-compose up --build
   ```

4. **Access the application:**
   - Client: http://localhost:5173
   - Server API: http://localhost:8080
   - MongoDB: Connected via `MONGODB_URI` (Atlas)

## Services

### Server (Node.js/Express)
- **Port:** 8080
- **Base URL:** http://localhost:8080
- **API Endpoints:** http://localhost:8080/api
- **MongoDB:** Connected to MongoDB Atlas via `MONGODB_URI`
- **Environment:** Set via `.env`

### Client (React/Vite)
- **Port:** 5173
- **Built with:** Vite, React, TailwindCSS
- **Build Stage:** Multi-stage build for optimized image

## Docker Commands

### Build and Start
```bash
# Build and start all services
docker-compose up --build

# Start in detached mode (background)
docker-compose up -d --build

# Start without rebuilding
docker-compose up
```

### Stop Services
```bash
# Stop all services
docker-compose stop

# Stop and remove containers
docker-compose down

# Remove containers and networks
docker-compose down
```

### View Logs
```bash
# View all logs
docker-compose logs

# Follow logs in real-time
docker-compose logs -f

# Logs for specific service
docker-compose logs -f server
docker-compose logs -f client
```

### Other Useful Commands
```bash
# View running containers
docker-compose ps

# Execute command in container
docker-compose exec server npm test
docker-compose exec client npm run build

# Rebuild specific service
docker-compose up -d --build server
```

## Environment Variables

All environment variables are configured in `.env.docker`:

- **PORT**: Server port (default: 8080)
- **NODE_ENV**: Environment (development/production)
- **MONGODB_URI**: MongoDB Atlas connection string
- **JWT_SECRET**: Secret key for JWT tokens
- **JWT_EXPIRE**: JWT expiration time
- **CLIENT_URL**: Frontend URL for CORS
- **GROQ_API_KEY**: API key for Groq services

## Troubleshooting

### "Port already in use"
```bash
# Find what's using the port
lsof -i :5173
lsof -i :8080

# Kill the process or change ports in docker-compose.yml
```

### "Connection refused to MongoDB"
- Verify your `MONGODB_URI` is correct in `.env`
- Check that MongoDB Atlas cluster is active
- Ensure your IP is whitelisted in MongoDB Atlas (add 0.0.0.0/0 for development)

### "Client can't connect to server"
- Verify server is running: `docker-compose ps`
- Check server logs: `docker-compose logs server`
- Ensure `CLIENT_URL` matches your frontend URL

### "Build fails"
```bash
# Clean up and rebuild
docker-compose down
docker-compose up --build

# Or rebuild without cache
docker-compose up --build --no-cache
```

## File Structure

```
LegAI/
├── docker-compose.yml       # Orchestrates all services
├── .env.docker              # Example environment variables
├── .dockerignore             # Files to ignore
├── server/
│   ├── Dockerfile           # Server image configuration
│   ├── .dockerignore        # Server build ignore rules
│   ├── package.json
│   ├── server.js
│   └── ...
└── client/
    ├── Dockerfile           # Client image configuration
    ├── .dockerignore        # Client build ignore rules
    ├── package.json
    ├── vite.config.js
    └── ...
```

## Network Configuration

Services communicate through the `legai-network` bridge network:
- **Client to Server:** `http://server:8080/api` (internal) or `http://localhost:8080/api` (external)
- **Server to MongoDB:** Connected via MongoDB Atlas URI
- **External access:** Use localhost with mapped ports

## Notes

- MongoDB is hosted on MongoDB Atlas (cloud-based)
- All services use the same network for easy service discovery
- Services automatically restart on failure (`restart: unless-stopped`)
- Client can reach server at `http://server:8080` internally
