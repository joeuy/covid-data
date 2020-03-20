const fs = require('fs');
const path = require('path');

const caseFolder = 'external-data/csse_covid_19_data/csse_covid_19_daily_reports';

const casesContent = fs
    .readdirSync(caseFolder)
    .filter(fileName => fileName.indexOf('.csv') >= 0)
    .filter(fileName => '03-01-2020.csv'.localeCompare(fileName) <= 0)
    .map((fileName, index) => {
        const [contentDate] = fileName.split('.', 1);
        let content = fs.readFileSync(path.join(caseFolder, fileName), 'utf-8').trim();

        // remove first line
        const firstLineEnd = content.indexOf('\n');
        content = index === 0 ? content : content.substr(firstLineEnd + 1);

        // add date
        content = content.replace(/\r?\n/g, `,${contentDate}\r\n`);

        // normalize country names
        content = content.replace(/Mainland China,/g, 'China,');
        content = content.replace(/,US,/g, ',United States,');

        // add date to last line
        content = content + `,${contentDate}`;

        return content;
    }).join('\n');

fs.writeFileSync('cases.csv', casesContent);