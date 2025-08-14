# MoveMates Startup Guide

## Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud)
- npm or yarn

## Step 1: Set up MongoDB

### Option A: Local MongoDB
1. Download and install MongoDB Community Server from [mongodb.com](https://www.mongodb.com/try/download/community)
2. Start MongoDB service:
   - **Windows**: MongoDB should run as a service automatically
   - **Mac**: `brew services start mongodb-community`
   - **Linux**: `sudo systemctl start mongod`

### Option B: MongoDB Atlas (Cloud)
1. Go to [mongodb.com/atlas](https://www.mongodb.com/atlas)
2. Create a free account and cluster
3. Get your connection string

## Step 2: Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Create .env file** with this content:
   ```env
   # Server Configuration
   PORT=5000
   NODE_ENV=development
   
   # MongoDB Configuration
   MONGODB_URI=mongodb://localhost:27017/movemates
   # OR for MongoDB Atlas:
   # MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/movemates
   
   # CORS Configuration
   CORS_ORIGIN=http://localhost:5173
   ```

3. **Install dependencies (if not already done):**
   ```bash
   npm install
   ```

4. **Start the backend server:**
   ```bash
   npm run dev
   ```

5. **Verify backend is running:**
   - You should see: `🚀 MoveMates API server running on port 5000`
   - Test: Open http://localhost:5000/health in your browser

## Step 3: Frontend Setup

1. **Open a new terminal and navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Start the frontend development server:**
   ```bash
   npm run dev
   ```

3. **Verify frontend is running:**
   - You should see: `Local: http://localhost:5173/`
   - Open http://localhost:5173 in your browser

## Step 4: Test the Application

1. **Open the application** in your browser at http://localhost:5173
2. **Connect your Aptos wallet** using the "Connect Wallet" button
3. **Try to sign up** with a new account
4. **Check the backend console** for any error messages

## Troubleshooting

### Backend Issues
- **"MongoDB connection error"**: Make sure MongoDB is running
- **"Port already in use"**: Change PORT in .env file or kill existing process
- **"Module not found"**: Run `npm install` in backend directory

### Frontend Issues
- **"process is not defined"**: Fixed - using Vite environment variables
- **"Failed to fetch"**: Make sure backend is running on port 5000
- **"Wallet not connected"**: Use the Connect Wallet button in the header

### Common Issues
1. **Backend not starting**: Check MongoDB connection and .env file
2. **Frontend showing blank page**: Check browser console for errors
3. **API calls failing**: Verify CORS_ORIGIN in backend .env matches frontend URL

## File Structure
```
movemates/
├── frontend/          # React frontend (port 5173)
│   ├── .env.local     # Frontend environment variables
│   └── ...
├── backend/           # Node.js backend (port 5000)
│   ├── .env          # Backend environment variables
│   └── ...
└── contract/          # Aptos smart contracts
```

## Environment Variables Summary

### Frontend (.env.local)
```env
VITE_API_URL=http://localhost:5000/api
```

### Backend (.env)
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/movemates
CORS_ORIGIN=http://localhost:5173
```

## Next Steps
Once everything is running:
1. Test user registration and login
2. Test wallet connection
3. Explore the different pages (Study Circles, Peer Learning, Tutor Booking)
4. Check that data is being stored in MongoDB

## Support
If you encounter issues:
1. Check the terminal output for error messages
2. Check the browser console for JavaScript errors
3. Verify all environment variables are set correctly
4. Make sure MongoDB is running and accessible
