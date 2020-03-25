const fs = require('fs');
const path = require('path');
const readCsv = require('./read-csv');
const createCsvWriter = require('csv-writer').createArrayCsvWriter;
const mapping = require('./mapping-fxs');

const caseFolder = 'external-data/csse_covid_19_data/csse_covid_19_daily_reports';

function getCaseFiles() {
    return fs
        .readdirSync(caseFolder)
        .filter(fileName => fileName.indexOf('.csv') >= 0)
        .filter(fileName => '03-01-2020.csv'.localeCompare(fileName) <= 0)
        .map(fileName => path.resolve(caseFolder, fileName));
}

async function run() {
    const caseFilesNames = getCaseFiles();

    const caseFiles = await Promise.all(
        caseFilesNames.map(name => readCsv(name))
    );

    const records = [];
    const csvWriter = createCsvWriter({
        header: mapping.headers,
        path: 'cases.csv'
    });

    const mappingFunctionNames = Object.keys(mapping.fxMap).sort();

    caseFiles.forEach((caseFile, i) => {
        const date = path.basename(caseFilesNames[i], '.csv');
        const [mappingFxName] = mappingFunctionNames.filter(fx => fx.localeCompare(date) <= 0).slice(-1);
        const mappingFx = mapping.fxMap[mappingFxName];

        console.log(date, mappingFxName);

        caseFile.forEach((_case) => {
            records.push(mappingFx(_case, date));
        });
    });

    csvWriter.writeRecords(records);
}

run();