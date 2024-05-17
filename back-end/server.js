import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

//Import routes
import weatherRouter from './routes/weather.js';
import exchangeRouter from './routes/exchange.js';

// Initialize Express app
const app = express();

// Load environment variables from .env file
dotenv.config();

// Set port from environment variable or default to 3000
const PORT = process.env.PORT || 3000;

// Apply middleware
app.use(cors());
app.use(express.json());

// Use routes
app.use('/weather', weatherRouter);
app.use('/exchange', exchangeRouter);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
