import express from 'express';

import BoletosConstroller from '../controllers/BoletosConstroller.js';

const boletosRoutes = express.Router();

boletosRoutes.get('/', BoletosConstroller.getAll);

boletosRoutes.post('/', (req, res) => {
    const {name, email} = req.body;
    res.json({message: `Adicionando usuário: ${name} (${email})`});
});

export default boletosRoutes;
