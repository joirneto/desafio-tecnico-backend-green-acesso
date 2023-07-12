import express from 'express';

import createTables from './database/create-tables.js';
import deleteTables from './database/delete-tables.js';
import insertTables from './database/insert-tables.js';
import boletosRoutes from './routes/boletosRoutes.js';

const app = express();
app.use(express.json());

await deleteTables();
await createTables();
await insertTables();

app.use('/boletos', boletosRoutes);

app.listen(8585, () => {
    console.log('Servidor iniciado na porta 3000');
});
