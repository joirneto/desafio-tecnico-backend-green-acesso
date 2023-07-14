import createTables from './create-tables.js';
import {inserirLotes} from './insert-tables.js';

const initDB = async () => {
    try {
        await createTables();
        await inserirLotes();

        return true;
    } catch (error) {
        return;
    }
};

export default initDB;
