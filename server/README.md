# LegAI Backend Server

Backend authentication server for LegAI built with Node.js, Express, MongoDB, and JWT authentication with Google OAuth support.

## 📁 Project Structure

```
server/
├── config/
│   └── db.js                # MongoDB connection
├── controllers/
│   └── authController.js    # Authentication logic
├── models/
│   └── User.js              # User schema
├── routes/
│   └── authRoutes.js        # API routes
├── middleware/
│   └── authMiddleware.js    # JWT verification
├── utils/
│   └── responseHelper.js    # Response formatting
├── app.js                   # Express app configuration
├── server.js                # Server entry point
├── .env                     # Environment variables
├── .gitignore
└── package.json
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- Google OAuth credentials (for Google authentication)

### Installation

1. Navigate to the server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
   - Copy the `.env` file and update the values:
   - Update `MONGODB_URI` with your MongoDB connection string
   - Update `JWT_SECRET` with a secure random string
   - Add your Google OAuth credentials (`GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`)

4. Start the development server:
```bash
npm run dev
```

The server will start on `http://localhost:5000`

## 🔑 Environment Variables

```env
PORT=5000
NODE_ENV=development

# MongoDB
MONGODB_URI=mongodb://localhost:27017/legai

# JWT
JWT_SECRET=your_jwt_secret_key_change_this_in_production
JWT_EXPIRE=7d

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback

# Frontend URL
CLIENT_URL=http://localhost:5173
```

## 📚 API Endpoints

### Authentication Routes

#### Register User (Local)
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "...",
      "name": "John Doe",
      "email": "john@example.com",
      "avatar": "https://via.placeholder.com/150",
      "role": "user",
      "authProvider": "local"
    },
    "token": "jwt_token_here"
  }
}
```

#### Login User (Local)
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

#### Google Authentication
```http
POST /api/auth/google
Content-Type: application/json

{
  "credential": "google_id_token"
}
```

#### Get Current User (Protected)
```http
GET /api/auth/me
Authorization: Bearer <token>
```

#### Update Profile (Protected)
```http
PUT /api/auth/profile
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "John Updated",
  "avatar": "https://example.com/avatar.jpg"
}
```

#### Logout (Protected)
```http
POST /api/auth/logout
Authorization: Bearer <token>
```

## 🔒 Authentication Flow

### Local Authentication
1. User registers with email and password
2. Password is hashed using bcrypt
3. JWT token is generated and returned
4. Token is used for subsequent authenticated requests

### Google OAuth
1. Frontend obtains Google ID token
2. Backend verifies token with Google
3. Creates or updates user in database
4. Returns JWT token for session management

## 🛡️ Security Features

- **Helmet**: Sets security HTTP headers
- **CORS**: Configurable cross-origin resource sharing
- **Rate Limiting**: Prevents brute force attacks (100 requests per 15 minutes)
- **MongoDB Sanitization**: Prevents NoSQL injection attacks
- **JWT**: Secure token-based authentication
- **Password Hashing**: Bcrypt with salt rounds

## 📝 User Model

```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed, optional for Google users),
  avatar: String,
  authProvider: 'local' | 'google',
  googleId: String (optional),
  isEmailVerified: Boolean,
  role: 'user' | 'admin',
  createdAt: Date,
  updatedAt: Date
}
```

## 🧪 Testing the API

Use tools like Postman, Insomnia, or Thunder Client to test the API endpoints.

### Health Check
```http
GET /health
```

Returns server status and timestamp.

## 🎯 Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon

## 🐛 Error Handling

The API uses consistent error responses:

```json
{
  "success": false,
  "message": "Error message here",
  "errors": [] // Optional additional error details
}
```

Common HTTP status codes:
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Internal Server Error

## 📦 Dependencies

- **express**: Web framework
- **mongoose**: MongoDB ODM
- **jsonwebtoken**: JWT authentication
- **bcryptjs**: Password hashing
- **google-auth-library**: Google OAuth verification
- **dotenv**: Environment variable management
- **cors**: CORS middleware
- **helmet**: Security middleware
- **express-rate-limit**: Rate limiting
- **express-mongo-sanitize**: NoSQL injection prevention
- **morgan**: HTTP request logger

## 🔧 Getting Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URIs
6. Copy Client ID and Client Secret to `.env`


