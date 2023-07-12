import db from './db.js';

const insertTables = async () => {
    try {
        await inserirLotes();
        await inserirBoletos();
    } catch (error) {
        console.log('Error: ', error);
    }
};

const inserirLotes = async () => {
    const data = {
        nome: '17',
        ativo: true,
    };

    try {
        await db('lotes').insert(data);
        console.log('Lotes Inseridos com sucesso.');
    } catch (error) {
        console.error(error);
    }

};

const inserirBoletos = async () => {
    const data = {
        nome_sacado: 'MARCIA CARVALHO',
        ativo: true,
        valor: '128.00',
        linha_digitavel: '123456123456123456',
        id_lote: 1,
    };

    try {
        await db('boletos').insert(data);
        console.log('Boletos Inseridos com sucesso.');
    } catch (error) {
        console.error(error);
    }
};

export default insertTables;
