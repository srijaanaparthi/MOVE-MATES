# MoveMates - Learning Platform on Aptos

A decentralized learning platform built on the Aptos blockchain, featuring Study Circles, Peer-to-Peer Learning, and Tutor Booking with on-chain reputation, credentials, and escrow.

## 🚀 Features

### Core Functionality
- **Study Circles**: Create or join topic-based learning communities
- **Peer-to-Peer Learning**: Teach to earn credits, spend credits to learn
- **Tutor Booking**: Availability, booking, and escrow payments
- **On-Chain Credentials**: Soulbound certificates and milestone badges
- **Reputation System**: Transparent, tamper-resistant ratings
- **Engagement**: Leaderboards, streaks, and quests

### Technical Features
- **Wallet Integration**: Aptos wallet connection (Petra, etc.)
- **Backend API**: Node.js + Express + MongoDB
- **Frontend**: React + TypeScript + Tailwind CSS
- **Blockchain**: Aptos smart contracts (Move)
- **Authentication**: Wallet-based user management

## 🏗️ Project Structure

```
movemates/
├── frontend/                 # React frontend application
│   ├── components/          # Reusable UI components
│   ├── pages/              # Application pages
│   ├── contexts/           # React contexts (Auth, etc.)
│   ├── services/           # API services
│   └── utils/              # Utility functions
├── backend/                 # Node.js backend API
│   ├── config/             # Database and server config
│   ├── models/             # MongoDB schemas
│   ├── routes/             # API endpoints
│   ├── middleware/         # Express middleware
│   └── server.js           # Main server file
└── contract/               # Aptos Move smart contracts
    ├── sources/            # Move source files
    └── Move.toml           # Move package config
```

## 🛠️ Prerequisites

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **MongoDB** (local or cloud)
- **Aptos CLI** (for smart contract deployment)

## 📦 Installation

### 1. Clone the Repository
```bash
git clone <repository-url>
cd movemates
```

### 2. Backend Setup
```bash
cd backend

# Install dependencies
npm install

# Environment setup
cp env.example .env

# Edit .env file with your configuration
# PORT=5000
# MONGODB_URI=mongodb://localhost:27017/movemates
# CORS_ORIGIN=http://localhost:3000

# Start MongoDB (local)
mongod

# Run backend (development)
npm run dev

# Run backend (production)
npm start
```

### 3. Frontend Setup
```bash
cd frontend

# Install dependencies
npm install

# Environment setup (optional)
# Create .env file if you need to customize API URL
# REACT_APP_API_URL=http://localhost:5000/api

# Run frontend (development)
npm run dev

# Build frontend (production)
npm run build
```

### 4. Smart Contract Setup
```bash
cd contract

# Install Move CLI
curl -fsSL "https://aptos.dev/scripts/install_cli.py" | python3

# Compile contracts
npm run move:compile

# Deploy to testnet/mainnet
npm run move:publish
```

## 🔌 API Endpoints

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

## 🎯 Usage Examples

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

## 🎨 Frontend Features

### Pages
- **Landing Page** (`/`): Welcome screen with sign in/login options
- **Sign In** (`/signin`): Create new account with wallet connection
- **Log In** (`/login`): Access existing account with wallet
- **Dashboard** (`/dashboard`): Main application interface
- **Study Circles** (`/circles`): Manage learning communities
- **Peer Learning** (`/peer`): Skill exchange system
- **Tutor Booking** (`/booking`): Schedule and manage sessions

### Components
- **Wallet Integration**: Aptos wallet adapter
- **Theme System**: Dark/light mode with green/blue gradients
- **Responsive Design**: Mobile-first approach
- **Toast Notifications**: User feedback system
- **Form Validation**: Input validation and error handling

## 🔐 Authentication Flow

1. **Wallet Connection**: User connects Aptos wallet
2. **Sign Up**: New users provide name, role, and optional email
3. **Login**: Existing users authenticate with wallet address
4. **Session Management**: User state maintained through React context
5. **API Integration**: All requests include wallet address for identification

## 🗄️ Database Schema

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

## 🚀 Development

### Backend Development
```bash
cd backend
npm run dev          # Start with nodemon
npm start            # Start production server
```

### Frontend Development
```bash
cd frontend
npm run dev          # Start development server
npm run build        # Build for production
npm run lint         # Run ESLint
```

### Smart Contract Development
```bash
cd contract
npm run move:test    # Run Move tests
npm run move:compile # Compile contracts
npm run move:publish # Deploy contracts
```

## 🔧 Configuration

### Environment Variables

#### Backend (.env)
| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | 5000 |
| `NODE_ENV` | Environment | development |
| `MONGODB_URI` | MongoDB connection string | - |
| `CORS_ORIGIN` | Allowed CORS origin | http://localhost:3000 |

#### Frontend (.env)
| Variable | Description | Default |
|----------|-------------|---------|
| `REACT_APP_API_URL` | Backend API URL | http://localhost:5000/api |

## 🧪 Testing

### Backend Testing
```bash
cd backend
npm test             # Run tests (to be implemented)
```

### Frontend Testing
```bash
cd frontend
npm test             # Run tests (to be implemented)
```

### Smart Contract Testing
```bash
cd contract
npm run move:test    # Run Move tests
```

## 🚀 Deployment

### Backend Deployment
1. Set environment variables
2. Build and deploy to your preferred hosting service
3. Ensure MongoDB is accessible

### Frontend Deployment
1. Build the application: `npm run build`
2. Deploy the `dist` folder to your hosting service
3. Update API URL in environment variables

### Smart Contract Deployment
1. Compile contracts: `npm run move:compile`
2. Deploy to Aptos network: `npm run move:publish`
3. Update contract addresses in frontend

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the documentation
- Review the code examples

## 🔮 Roadmap

- [ ] Study Circle creation and management
- [ ] Peer-to-peer learning sessions
- [ ] Tutor booking and escrow system
- [ ] On-chain credentials and badges
- [ ] Reputation and rating system
- [ ] Engagement and gamification
- [ ] Community governance (DAO)
- [ ] Mobile application
- [ ] Advanced search and filtering
- [ ] Video conferencing integration
- [ ] Payment processing
- [ ] Analytics dashboard

---

**Built with ❤️ on Aptos Blockchain**
