import fs from 'fs';
import PDFDocument from 'pdfkit';

import db from './db.js';

export const pesquisaLotePorNome = async (nome) => {
    try {
        return await db('lotes').select('id', 'nome').where('nome', nome);
    } catch (error) {
        console.error(error);
    }
};

export const pesquisaClientePorNome = async (nome) => {
    try {
        return await db('boletos').select('id').where('nome_sacado', 'like', `%${nome}%`);
    } catch (error) {
        console.error(error);
    }
};

export const getAllBoletos = async (filtros) => {
    try {
        const keys = Object.keys(filtros);

        const qb = (search) => {
            for (const key of keys) {
                if (key === 'nome') {
                    search.andWhere('nome_sacado', 'like', `%${filtros[key]}%`);
                } else if (key === 'valor_inicial') {
                    search.andWhere('valor', '>=', filtros[key]);
                } else if (key === 'valor_final') {
                    search.andWhere('valor', '<=', filtros[key]);
                } else if (key === 'id_lote') {
                    search.andWhere('id_lote', filtros[key]);
                }
            }
        };
        return await db('boletos').select('*').where(qb);
    } catch (error) {
        console.error(error);
    }
};

export const pdfBase64 = (query) => {
    return new Promise((resolve, _) => {
        const doc = new PDFDocument();
        const currentDate = new Date();
        const unixTimestamp = Math.floor(currentDate.getTime() / 1000);
        doc.pipe(fs.createWriteStream(`relatorios/${unixTimestamp}.pdf`));
        const buffers = [];
        doc.on('data', chunk => {
            buffers.push(chunk);
        });

        doc.on('end', () => {
            const pdfData = Buffer.concat(buffers);
            const base64String = pdfData.toString('base64');
            resolve(base64String);
        });

        doc.font('Helvetica-Bold').fontSize(12);
        doc.text('id | nome_sacado        | id_lote | valor  | linha_digitavel');
        doc.moveDown();
        doc.font('Helvetica').fontSize(10);
        query.forEach(item => {
            doc.text(`${item.id.toString().padEnd(3)} | ${item.nome_sacado.padEnd(20)} | ${item.id_lote.toString().padEnd(7)} | ${item.valor.toFixed(2).toString().padEnd(6)} | ${item.linha_digitavel}`);
        });
        doc.end();
    });
};
