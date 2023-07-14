import express from 'express';

import initDB from './database/init.js';
import boletosRoutes from './routes/boletosRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';

const app = express();
app.use(express.json());

if (await initDB()) {
    app.use('/upload', uploadRoutes);
    app.use('/boletos', boletosRoutes);

    app.listen(3000, () => {
        console.log('Servidor iniciado na porta 3000');
    });
} else {
    console.log('Erro na inicialização do DB. Reinicie a aplicação ou procure o Admin.');
}
