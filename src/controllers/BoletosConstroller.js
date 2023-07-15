import {getAllBoletos, pdfBase64} from '../database/querys.js';

const BoletosConstroller = {
    async getAll(req, res) {
        const filtros = req?.query;
        const query = await getAllBoletos(filtros);
        if (filtros?.relatorio === '1') {
            try {
                const base64String = await pdfBase64(query);
                res.json({pdfBase64: base64String});
            } catch (error) {
                console.error(error);
                res.status(500).json({message: 'Error na geração do PDF'});
            }
        } else {
            res.send(query);
        }
    },
};

export default BoletosConstroller;
