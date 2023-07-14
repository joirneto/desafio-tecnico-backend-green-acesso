import csv from 'csv-parser';
import fs from 'fs';

import {inserirBoletos} from '../database/insert-tables.js';

const UploadConstroller = {
    upload(req, res) {
        const {file} = req;

        if (!file) {
            res.status(400).send('Nenhum arquivo enviado.');
            return;
        }

        const results = [];
        fs.createReadStream(file.path)
            .pipe(csv({separator: ';'}))
            .on('data', (data) => results.push(data))
            .on('end', async () => {
                try {
                    await inserirBoletos(results);
                    res.send('Upload do arquivo realizado com sucesso!');
                } catch (error) {
                    res.status(400).send('Erro no upload. Error? ' + error);
                }
            });
    },
};

export default UploadConstroller;
