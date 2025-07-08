const { loadData } = require('../data/loadData');
const { writeData } = require('../data/writeData');

function newValidName(req, res) {
    const { name } = req.body;
    
    if (!name || typeof name !== 'string' || name.trim() === '') {
        return res.status(400).json({ error: 'Nome inválido' });
    }
    
    const validName = name.trim();

    const data = loadData();

    if (data.correct_names.includes(validName)) {
        return res.status(400).json({ error: 'Nome já existe' });
    }

    data.correct_names.push(validName);

    data.incorrect_names = data.incorrect_names.filter(n => n !== validName);
    data.names = data.names.filter(n => n.try !== validName);

    writeData(data);

    return res.status(201).json({
        message: 'Nome adicionado com sucesso',
    });
}

module.exports = { newValidName };
