# LegAI

### 🧩 Project Overview

LegalEase is a simple web app built with **Vite + React (JavaScript)** that helps users **understand and interact with legal documents** using an **AI chatbot**.
The goal is to make complex legal language more accessible by allowing users to upload documents and chat with an AI that explains, summarizes, and answers questions about the content in plain language.

---

## 🚀 Quick Start with Docker

### Prerequisites

- [Docker Desktop](https://www.docker.com/products/docker-desktop) installed and running
- Docker Compose (included with Docker Desktop)
- Git (to clone the repository)

### Step-by-Step Setup

#### 1. Clone the Repository
```bash
git clone <repository-url>
cd LegAI
```

#### 2. Set Up Environment Variables
Create a `.env` file in the root directory with the following variables:
```bash
# Server Configuration
PORT=8080
NODE_ENV=development

# Database
MONGODB_URI=your_mongodb_connection_string

# JWT Configuration
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=7d

# Client Configuration
CLIENT_URL=http://localhost:5173

# AI Configuration
GROQ_API_KEY=your_groq_api_key
```

> **Note:** Replace the placeholder values with your actual credentials. For MongoDB, you can use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) for a free cloud database.

#### 3. Build Docker Images
```bash
docker-compose build
```

This command will:
- Pull the Node.js Alpine base images
- Install all dependencies for both client and server
- Build the React frontend for production
- Create optimized Docker images

#### 4. Start the Application
```bash
docker-compose up -d
```

The `-d` flag runs containers in detached mode (background).

#### 5. Verify Containers are Running
```bash
docker-compose ps
```

You should see both `legai-server` and `legai-client` with status "Up".

#### 6. View Logs (Optional)
```bash
# View all logs
docker-compose logs -f

# View server logs only
docker-compose logs -f server

# View client logs only
docker-compose logs -f client
```

Press `Ctrl+C` to stop following logs.

#### 7. Access the Application
- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:8080/api

---

## 🛠️ Development Commands

### Stop the Application
```bash
docker-compose stop
```

### Stop and Remove Containers
```bash
docker-compose down
```

### Rebuild and Restart (after code changes)
```bash
docker-compose up --build -d
```

### Rebuild from Scratch (no cache)
```bash
docker-compose build --no-cache
docker-compose up -d
```

### View Container Resource Usage
```bash
docker stats
```

### Execute Commands in Running Containers
```bash
# Access server container shell
docker-compose exec server sh

# Access client container shell
docker-compose exec client sh

# Run npm commands in server
docker-compose exec server npm run dev
```

---

## 🐛 Troubleshooting

### Port Already in Use
If you get a "port already in use" error:
```bash
# Find what's using the port
lsof -i :5173
lsof -i :8080

# Kill the process or change ports in docker-compose.yml
```

### MongoDB Connection Failed
- Verify your `MONGODB_URI` is correct in `.env`
- Check that your MongoDB Atlas cluster is active
- Ensure your IP is whitelisted in MongoDB Atlas (add `0.0.0.0/0` for development)

### Client Can't Connect to Server
- Verify server is running: `docker-compose ps`
- Check server logs: `docker-compose logs server`
- Ensure `CLIENT_URL` in `.env` matches your frontend URL

### Build Fails
```bash
# Clean up and rebuild
docker-compose down
docker system prune -f
docker-compose up --build
```

### View Detailed Error Logs
```bash
docker-compose logs --tail=100 server
docker-compose logs --tail=100 client
```

---

## 📁 Project Structure

```
LegAI/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── pages/         # Page components
│   │   └── utils/         # API utilities
│   ├── Dockerfile         # Client Docker configuration
│   └── package.json
├── server/                # Node.js backend
│   ├── config/            # Database configuration
│   ├── controllers/       # Route controllers
│   ├── models/            # MongoDB models
│   ├── routes/            # API routes
│   ├── middleware/        # Express middleware
│   ├── Dockerfile         # Server Docker configuration
│   └── package.json
├── docker-compose.yml     # Docker Compose configuration
├── .env                   # Environment variables (create this)
└── README.md
```

---

## 🧭 Project Plan

**Phase 1 — Core Setup** ✅

* Initialize Vite + React project
* Build minimal chat interface (user + AI bubbles)
* Integrate AI API for text-based responses
* Basic context memory for ongoing conversation

**Phase 2 — Document Understanding** 🚧

* Add file upload (PDF/Text)
* Parse and extract text from uploaded documents
* Send relevant sections to the AI model for context-aware replies
* Display structured summaries (clauses, definitions, obligations)

**Phase 3 — Experience & Refinement** 📋

* Improve UI/UX with smooth chat animations and loading indicators
* Add error handling, rate limits, and session persistence
* Optimize prompt engineering for better legal interpretations
* Optional: Support embeddings or offline model for private analysis

---

## 📚 API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (requires auth)
- `PUT /api/auth/profile` - Update user profile (requires auth)

### Chat Endpoints
- `POST /api/chats` - Create a new chat
- `GET /api/chats` - Get all user chats
- `GET /api/chats/:id` - Get specific chat
- `POST /api/chats/:id/messages` - Send a message
- `GET /api/chats/:id/messages` - Get chat messages
- `PUT /api/chats/:id` - Rename chat
- `DELETE /api/chats/:id` - Delete chat

### AI Integration
- `POST /api/groq/chat` - Send message to AI (requires auth)

---

## 📝 License

This project is licensed under the ISC License.

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

## 📧 Support

For issues and questions, please create an issue in the repository.
