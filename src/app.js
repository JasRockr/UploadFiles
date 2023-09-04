import express from 'express';
import config from './config';
import cors from 'cors';

import indexRoutes from './routes/index.routes.js';
import asesoresRoutes from './routes/asesores.routes.js';

const app = express();

// Set
app.set('port', config.port);

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use(indexRoutes);
app.use(asesoresRoutes);

export default app;
