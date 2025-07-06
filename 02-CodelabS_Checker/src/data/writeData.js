const fs = require('fs');
const path = require('path');

function writeData(data) {
    fs.writeFileSync(
        path.join(__dirname, '../database/index.json'),
        JSON.stringify(data, null, 4),
        'utf8'
    );
}

module.exports = { writeData };
