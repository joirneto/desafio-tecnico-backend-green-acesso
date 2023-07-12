import db from './db.js';

const createTables = async () => {
    try {
        await createLotes();
        await createBoletos();
    } catch (error) {
        console.log('Error: ', error);
    }
};

const createLotes = async () => {
    try {
        const valid = await db.schema.hasTable('lotes');
        if (!valid) {
            try {
                await db.schema.createTable('lotes', (table) => {
                    table.increments('id').primary();
                    table.string('nome', 100);
                    table.boolean('ativo');
                    table.timestamp('criado_em');

                    console.log('Tabela Lotes criada com sucesso!');
                });
            } catch (error) {
                console.log('Error: ', error);
            }
        }
    } catch (error) {
        console.log('Error: ', error);
    }
};

const createBoletos = async () => {
    try {
        const valid = await db.schema.hasTable('boletos');
        if (!valid) {
            try {
                await db.schema.createTable('boletos', (table) => {
                    table.increments('id').primary();
                    table.string('nome_sacado', 255);
                    table.integer('id_lote').unsigned().notNullable().references('id').inTable('lotes');
                    table.decimal('valor');
                    table.string('linha_digitavel', 255);
                    table.boolean('ativo');
                    table.timestamp('criado_em');

                    console.log('Tabela Boletos criada com sucesso!');
                });
            } catch (error) {
                console.log('Error: ', error);
            }
        }
    } catch (error) {
        console.log('Error: ', error);
    }
};

export default createTables;
