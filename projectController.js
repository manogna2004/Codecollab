const express = require('express');

const cors = require('cors');

const mongoose = require('mongoose');

const dotenv = require('dotenv');



// Load environment variables from .env file (if you use one)

dotenv.config();



// --- Configuration ---

const PORT = process.env.PORT || 3000;

// NOTE: REPLACE THIS WITH YOUR ACTUAL MONGODB URI

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/codecollab'; 



// --- Database Connection ---

const connectDB = async () => {

    try {

        await mongoose.connect(MONGO_URI);

        console.log('MongoDB Connected Successfully');

    } catch (error) {

        console.error('MongoDB Connection Failed:', error.message);

        // Exit process with failure

        process.exit(1);

    }

};



connectDB();



const app = express();



// --- Middleware Setup ---

// Enable CORS for frontend running on port 3001

app.use(cors({

    origin: 'http://localhost:3001', 

    methods: ['GET', 'POST', 'PUT', 'DELETE']

}));

app.use(express.json()); // Body parser for raw JSON



// --- Import Routers ---

// NOTE: Assuming auth routes are in server/routes/auth.js

const authRoutes = require('./routes/auth');

const projectRoutes = require('./routes/project'); // New Project Router



// --- Mount Routes ---

app.use('/api/auth', authRoutes); // e.g., POST /api/auth/register

app.use('/api/projects', projectRoutes); // e.g., GET/POST /api/projects



// Basic health check route

app.get('/', (req, res) => {

    res.send('CodeCollab Backend API Running!');

});



app.listen(PORT, () => {

    console.log(`Server running on port ${PORT}`);

});

