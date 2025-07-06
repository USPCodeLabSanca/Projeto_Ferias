const { loadData  } = require('../data/loadData');
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

    for (let i = 0; i < data.incorrect_names.length; i++) {
        if (data.incorrect_names[i] == validName) {
            data.incorrect_names.splice(i, 1);
            break;
        }
    }

    for (let i = 0; i < data.names.length; i++) {
        if (data.names[i].try == validName) {
            data.names.splice(i, 1);
            break;
        }
    }

    writeData(data);

    return res.status(200).json({ message: 'Nome adicionado com sucesso' });
}

module.exports = { newValidName };
