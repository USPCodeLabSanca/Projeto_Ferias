const { loadData  } = require("../data/loadData");

function getErrorStatistics(_, res) {
    const data = loadData();

    let list = data.names;

    list.sort((a, b) => b.count - a.count);

    for (let i = 0; i < list.length; i++) {
        list[i].position = i + 1;
    }

    return res.status(200).json({
        message: "Estatísticas de erros obtidas com sucesso",
        data: list
    });
}

module.exports = { getErrorStatistics };
