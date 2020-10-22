const { GoogleSpreadsheet } = require('google-spreadsheet');
const { promisify } = require('util')

const doc = new GoogleSpreadsheet('1WaEGZe1BtXgx0Puz8PbPmmRjAJ76Hk6dZwNnxKMcvhs');

async function accessSpreadsheet() {
    // spreadsheet key is the long id in the sheets URL  
    return await doc.useServiceAccountAuth(require('./credentials/client_secret.json'));
}

async function readInfo() {
    return await doc.loadInfo()
}

accessSpreadsheet()
    .then(login => {
        console.log(login)
    })
    .catch(e => {
        console.log(e)
    })
readInfo()
    .then(info => {
        console.log(doc.title);
    })
    .catch(e => {
        console.log(e)
    })
    