const { loadData } = require('../data/loadData');
const { writeData } = require('../data/writeData');

function verifyName(req, res) {
    const { name } = req.body;

    let data = loadData();

    for (let i = 0; i < data.correct_names.length; i++) {
        if(name.trim() == data.correct_names[i]) {
            return res.status(200).send({
                valid: true,
            });
        }
    }

    for (let i = 0; i < data.names.length; i++) {
        if (data.names[i].try == name.trim()) {
            data.names[i].count += 1;

            writeData(data);

            return res.status(200).send({
                valid: false,
            });
        }
    }

    data.names.push({
        try: name.trim(),
        count: 1,
    });

    writeData(data);

    return res.status(200).send({
        valid: false,
    });
}

module.exports = { verifyName };
