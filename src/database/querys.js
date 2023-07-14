import db from './db.js';

export const pesquisaLotePorNome = async (nome) => {
    try {
        return await db('lotes').select('id', 'nome').where('nome', nome);
    } catch (error) {
        console.error(error);
    }
};
