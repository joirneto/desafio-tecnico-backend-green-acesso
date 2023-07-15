import csv from 'csv-parser';
import fs from 'fs';
import {PDFDocument} from 'pdf-lib';
import PDFParser from 'pdf2json';

import {inserirBoletos} from '../database/insert-tables.js';
import {pesquisaClientePorNome} from '../database/querys.js';

const UploadConstroller = {
    uploadCSV(req, res) {
        const {file} = req;

        if (!file) {
            res.status(400).send('Nenhum arquivo enviado.');
            return;
        }

        const csvExt = file?.originalname.split('.')[1];
        if (csvExt !== 'csv') {
            res.status(400).send('Arquivo não é .csv!');
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

    async uploadPDF(req, res) {
        const {file} = req;

        if (!file) {
            res.status(400).send('Nenhum arquivo enviado.');
            return;
        }

        const pdfExt = file?.originalname.split('.')[1];
        if (pdfExt !== 'pdf') {
            res.status(400).send('Arquivo não é .pdf!');
            return;
        }

        try {
            const pdfParser = new PDFParser();
            const pdfFilePath = file.path;

            pdfParser.on('pdfParser_dataReady', async function (pdfData) {

                const clientes = [];
                const idClientes = [];
                const pageClientes = [];

                for (const page of pdfData.Pages) {
                    const text = page.Texts.map(item => decodeURIComponent(item.R[0].T));
                    const nomeCliente = text.splice(':');
                    clientes.push(nomeCliente[0]);
                    const idCliente = await retrieveClienteNome(nomeCliente[0]);
                    idClientes.push(idCliente);
                    pageClientes.push(page);
                }

                await splitPDF(pdfFilePath, idClientes);
            });

            pdfParser.loadPDF(pdfFilePath);

            res.send('Arquivo PDF separado por cliente com sucesso.');
        } catch (error) {
            console.error('Erro ao separar o arquivo PDF:', error);
            res.status(500).send('Ocorreu um erro ao processar o arquivo PDF.');
        }
    },
};

export default UploadConstroller;

const retrieveClienteNome = async (nome) => {
    const [res] = await pesquisaClientePorNome(nome);
    return res?.id;
};

async function splitPDF(inputPath, idClientes) {
    try {
        console.log(idClientes);
        const pdfBuffer = fs.readFileSync(inputPath);
        const pdfDoc = await PDFDocument.load(pdfBuffer);
        const pageCount = pdfDoc.getPageCount();

        for (let pageNum = 0; pageNum < pageCount; pageNum++) {
            const newPdf = await PDFDocument.create();
            const [copiedPage] = await newPdf.copyPages(pdfDoc, [pageNum]);
            newPdf.addPage(copiedPage);

            const outputPath = `arquivos-separados-pdf/${idClientes[pageNum]}.pdf`;
            const pdfBytes = await newPdf.save();

            fs.writeFileSync(outputPath, pdfBytes);
        }
        console.log('Divisão de PDF concluída!');
    } catch (error) {
        console.log('Ocorreu um erro:', error);
    }
}
