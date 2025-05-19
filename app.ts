import cors from 'cors';
import 'express-async-errors';
import express, { Express } from 'express';
import { ENV } from '@/src/config/env';
import { routers } from './src/routes';
const helmet = require('helmet');

const app: Express = express();

app.use(helmet());

const corsOptions = {
    credentials: true,
    origin: ENV.ALLOW_ORIGINS,
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Define your API routes
app.use('/api', routers); 
export { app };