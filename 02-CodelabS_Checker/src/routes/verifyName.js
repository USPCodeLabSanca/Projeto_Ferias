const { loadData } = require('../data/loadData');
const { writeData } = require('../data/writeData');

function verifyName(req, res) {
    const { name } = req.body;

    if (!name || typeof name !== 'string' || !name.trim()) {
        return res.status(400).json({ error: 'Name is required and must be a non-empty string.' });
    }

    let data = loadData();

    if(data.correct_names.includes(name.trim())) {
        return res.status(200).json({
            valid: true,
        });
    }

    const existing = data.names.find(n => n.try === name.trim());
    
    if (existing) {
        existing.count += 1;
    } else {
        data.names.push({
            try: name.trim(),
            count: 1,
        });
    }

    writeData(data);

    return res.status(200).json({
        valid: false,
    });
}

module.exports = { verifyName };
