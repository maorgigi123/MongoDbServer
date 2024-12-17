import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';

dotenv.config();

import GetCurrentPage from './controllers/GetCurrentPage';  

// Import your Models
import Categories from './Schema/Categories';
import DataByCategories from './Schema/DataByCategories';


// MongoDB URI from environment variables
const mongoURI = process.env.MONGO_URI as string;

// Create an express app
const app = express();

// Connect to MongoDB
mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Enable CORS
app.use(cors());
app.use(helmet());  // מוסיף הגנה למגוון בעיות אבטחה

// Correctly invoke the GetCurrentPage function
app.get('/images', async (req: Request, res: Response) => {
  try {
    const getCurrentPageHandler = GetCurrentPage(Categories, DataByCategories);
    // Directly invoke the handler
    await getCurrentPageHandler(req, res);
  } catch (err) {
   console.log('error')
  }
});



// Start the server
app.listen(process.env.PORT || 3001, () => {
  console.log('server is running on port 3001');
});
