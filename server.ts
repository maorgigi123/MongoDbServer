import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';

dotenv.config();

import GetCurrentPage from './controllers/GetCurrentPage';  

// Import Models
import Categories from './Schema/Categories';
import DataByCategories from './Schema/DataByCategories';


// MongoDB URI from environment variables
const mongoURI = process.env.MONGO_URI as string;

// Create an express app
const app = express();

// Connect to MongoDB
mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Ensures the app exits if MongoDB connection fails
  });
// Enable CORS
app.use(cors());
app.use(helmet());  // מוסיף הגנה למגוון בעיות אבטחה

// Invoke the GetCurrentPage function when route is /images
app.get('/images', async (req: Request, res: Response) => {
  try {
    const getCurrentPageHandler = GetCurrentPage(Categories, DataByCategories);
    // Directly invoke the handler
    await getCurrentPageHandler(req, res);
  } catch (err) {
    // Log error details for debugging purposes
    console.error('Error occurred:', err);
    res.status(500).json({ error: 'An error occurred while fetching data' });
  }
});

// Start the server
app.listen(process.env.PORT || 3001, () => {
  console.log('server is running on port 3001');
});
