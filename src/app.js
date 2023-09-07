import express from 'express';
import config from './config';
import cors from 'cors';

import indexRoutes from './routes/index.routes.js';
import asesoresRoutes from './routes/asesores.routes.js';

const app = express();

// Set
app.set('port', config.port);

const corsOptions = {
  origin: '*', // Permitir solicitudes desde cualquier origen (esto puede ser personalizado)
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Métodos HTTP permitidos
};
// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use(indexRoutes);
app.use(asesoresRoutes);

export default app;
