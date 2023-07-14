import db from './db.js';
import lotes from '../../mocks/lotes.js';
import {pesquisaLotePorNome} from '../database/querys.js';

export const inserirLotes = async () => {
    try {
        await db('lotes').delete();
        await db('lotes').insert(lotes);
        console.log('Lotes Inseridos com sucesso.');
    } catch (error) {
        console.error(error);
    }

};

export const inserirBoletos = async (data) => {
    try {
        const _data = await Promise.all(await transformData(data));
        try {
            await db('boletos').insert(_data);
            await db.destroy();
            console.log('Boletos Inseridos com sucesso.');
        } catch (error) {
            db.destroy();
            console.error(error);
        }

    } catch (error) {
        console.error(error);
    }
};

const transformData = (data) => {
    return data.map(async (item) => {
        const id_lote = await validLotes(item.unidade);
        return {
            nome_sacado: item.nome,
            ativo: true,
            id_lote,
            valor: item.valor,
            linha_digitavel: item.linha_digitavel,
            criado_em: new Date(),
        };
    });
};

const validLotes = async (nome) => {
    const [res] = await pesquisaLotePorNome(nome);
    return res.id;
};
