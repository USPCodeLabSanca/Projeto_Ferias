const { loadData } = require('../data/loadData');

function getRandomName(_, res) {
    const names = loadData().incorrect_names;

    if (!names || names.length === 0) {
        return res.status(500).send({
            error: 'No names available',
        });
    }

    return res.status(200).send({
        name: names[Math.floor(Math.random() * names.length)],
    });
}

module.exports = { getRandomName };
