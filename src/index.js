import express from 'express';

import config from './config.js';
import initDB from './database/init.js';
import boletosRoutes from './routes/boletosRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';

const app = express();
app.use(express.json());

if (await initDB()) {
    app.use('/api/upload', uploadRoutes);
    app.use('/api/boletos', boletosRoutes);

    app.listen(config.PORT, () => {
        console.log(`Servidor iniciado na porta ${config.PORT}`);
    });
} else {
    console.log('Erro na inicialização do DB. Reinicie a aplicação ou procure o Admin.');
}
