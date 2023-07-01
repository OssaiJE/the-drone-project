import express, { Application, Request, Response, NextFunction } from 'express';
import helmet from 'helmet';
import path from 'path';
import cors from 'cors';
import nocache from 'nocache';
// import swaggerUI from 'swagger-ui-express';
import dotenv from 'dotenv';
import connectDB from './config/database';
// import swaggerSpec from './config/swaggerDef';
// import router from './routes';

const app: Application = express();

dotenv.config();
connectDB();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(helmet());
app.use(nocache());
app.use(cors());

app.get('/', (req: Request, res: Response) => {
  res.setHeader('Content-Type', 'application/json');
  res.send('Welcome to The Drone Project API');
});

app.set('trust proxy', true);

// view engine setup
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '../public/views'));

// app.use('/api/v1', router);

app.use('/no-route', (req: Request, res: Response, next: NextFunction) => {
  next();
});

app.use('*', (req: Request, res: Response) => {
  return res.status(404).json({
    status: 404,
    message: 'No endpoint matches that URL'
  });
});

export default app;
