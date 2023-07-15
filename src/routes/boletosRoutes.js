import express from 'express';

import BoletosConstroller from '../controllers/BoletosConstroller.js';

const boletosRoutes = express.Router();

boletosRoutes.get('/', BoletosConstroller.getAll);

export default boletosRoutes;
