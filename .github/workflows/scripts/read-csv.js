const csv = require('csv-parser')
const fs = require('fs')

module.exports = function (path) {
    return new Promise((resolve, reject) => {
        const results = [];
        fs.createReadStream(path)
            .pipe(csv({ headers: false, skipLines: 1 }))
            .on('data', (data) => results.push(data))
            .on('error', (er) => reject(er))
            .on('end', () => resolve(results));
    });
}

