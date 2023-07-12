import db from './db.js';

const deleteTables = async () => {
    try {
        await deleteLotes();
        await deleteBoletos();
    } catch (error) {
        console.log('Error: ', error);
    }
};

const deleteLotes = async () => {
    try {
        await db.schema.dropTable('lotes');
    } catch (error) {
        console.error(error);
    }
};

const deleteBoletos = async () => {
    try {
        await db.schema.dropTable('boletos');
    } catch (error) {
        console.error(error);
    }
};

export default deleteTables;
