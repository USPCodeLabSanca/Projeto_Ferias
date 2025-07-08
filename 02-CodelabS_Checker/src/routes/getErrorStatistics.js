const { loadData  } = require("../data/loadData");

function getErrorStatistics(_, res) {
    const data = loadData();

    let list = [...data.names]
        .sort((a, b) => b.count - a.count)
        .slice(0, 10)
        .map((item, index) => ({
            ...item,
            position: index + 1
        }));

    return res.status(200).json({
        message: "Estatísticas de erros obtidas com sucesso",
        ranking: list
    });
}

module.exports = { getErrorStatistics };
