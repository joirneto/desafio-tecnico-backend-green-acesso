import csv from 'csv-parser';
import fs from 'fs';

// import db from './src/database/db';

const results = [];

fs.createReadStream('mocks/teste.csv')
    .pipe(csv({separator: ';'})) // Defina o separador adequado do seu arquivo CSV
    .on('data', (data) => results.push(data))
    .on('end', () => {
        console.log(results); // Aqui você pode fazer o processamento necessário com os dados do arquivo CSV
    });
