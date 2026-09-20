import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { errorHandler } from './middleware/errorHandler.js';
import apiRouter from './routes/index.js';

const app = express();

// Global Middlewares
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Log API requests in development
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

// Root welcome route
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Welcome to DevMentor AI API',
    docs: '/api/health',
  });
});

// Base Routing API namespace
app.use('/api', apiRouter);

// Catch 404 (Route not found)
app.use((req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
});

// Centralized Error Handling
app.use(errorHandler);

export default app;
