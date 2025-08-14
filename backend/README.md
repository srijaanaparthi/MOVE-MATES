# MoveMates Backend API

A Node.js + Express + MongoDB backend for the MoveMates learning platform.

## Features

- **User Authentication**: Wallet-based signup and login
- **User Management**: CRUD operations for users
- **Role-based Access**: Support for students and tutors
- **Search & Filtering**: Advanced user search capabilities
- **Pagination**: Efficient data loading
- **Security**: CORS, Helmet, input validation

## Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or cloud)
- npm or yarn

## Installation

1. **Clone the repository**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp env.example .env
   ```
   
   Edit `.env` file with your configuration:
   ```env
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/movemates
   CORS_ORIGIN=http://localhost:3000
   ```

4. **Start MongoDB**
   - Local: `mongod`
   - Or use MongoDB Atlas cloud service

5. **Run the server**
   ```bash
   # Development (with auto-reload)
   npm run dev
   
   # Production
   npm start
   ```

## API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/user/:walletAddress` - Get user profile
- `PUT /api/auth/user/:walletAddress` - Update user profile

### Users
- `GET /api/users/tutors` - Get all tutors (with pagination & filtering)
- `GET /api/users/students` - Get all students (with pagination)
- `GET /api/users/search` - Search users by name/subjects
- `GET /api/users/stats` - Get platform statistics

### Health Check
- `GET /health` - Server health status

## API Usage Examples

### Sign Up
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "walletAddress": "0x123...",
    "name": "John Doe",
    "role": "tutor",
    "email": "john@example.com"
  }'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "walletAddress": "0x123..."
  }'
```

### Get Tutors
```bash
curl "http://localhost:5000/api/users/tutors?page=1&limit=10&subject=math&rating=4"
```

## Database Schema

### User Model
```javascript
{
  walletAddress: String,    // Unique identifier
  name: String,             // Display name
  role: String,             // "student" or "tutor"
  email: String,            // Optional
  profileImage: String,     // Optional
  bio: String,              // Optional
  subjects: [String],       // Array of subjects
  rating: Number,           // 0-5 rating
  totalSessions: Number,    // Total sessions completed
  isActive: Boolean,        // Account status
  createdAt: Date,
  updatedAt: Date
}
```

## Development

### Project Structure
```
backend/
├── config/
│   └── database.js         # MongoDB connection
├── middleware/
│   └── errorHandler.js     # Error handling
├── models/
│   └── User.js            # User schema
├── routes/
│   ├── auth.js            # Authentication routes
│   └── users.js           # User management routes
├── server.js              # Main server file
├── package.json
└── README.md
```

### Scripts
- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server
- `npm test` - Run tests (to be implemented)

## Security Features

- **CORS**: Configurable cross-origin requests
- **Helmet**: Security headers
- **Input Validation**: Request data validation
- **Error Handling**: Secure error responses
- **Rate Limiting**: Built-in Express rate limiting

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | 5000 |
| `NODE_ENV` | Environment | development |
| `MONGODB_URI` | MongoDB connection string | - |
| `CORS_ORIGIN` | Allowed CORS origin | http://localhost:3000 |

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details
