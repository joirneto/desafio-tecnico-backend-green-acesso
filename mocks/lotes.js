const lotes = [];

for (let i = 100; i > 0; --i) {
    lotes.push({nome: i, ativo: true, criado_em: new Date()});
}

export default lotes;
