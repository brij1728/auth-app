import express, { NextFunction, Request, Response } from 'express';

import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import createHttpError from 'http-errors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';

// import router from './routes';

interface HttpError extends Error {
  status?: number; // Optional because not all errors may include a status
}

dotenv.config();

const app = express();

// Middleware for security and performance
app.use(morgan('dev'));
app.use(helmet());
app.use(
  cors({
    origin: process.env.CLIENT_URL, // Ensure CORS settings are correct
    credentials: true,
  }),
);
app.use(compression());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test route for simple checks
app.get('/test', (req, res) => {
  res.status(200).send('Test endpoint is working!');
});

// Routes
// app.use('/', router);

// Not found middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  next(createHttpError(404, 'Endpoint not found'));
});

// Centralized error handling
app.use((err: HttpError, req: Request, res: Response) => {
  const status = err.status || 500;
  res.status(status).json({
    error: {
      status,
      message: err.message || 'Internal Server Error',
    },
  });
});

export default app;
