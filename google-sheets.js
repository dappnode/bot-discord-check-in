const { GoogleSpreadsheet } = require('google-spreadsheet') 

const doc = new GoogleSpreadsheet('1WaEGZe1BtXgx0Puz8PbPmmRjAJ76Hk6dZwNnxKMcvhs');

const getDate = function () {
    const today = new Date()
    const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const dateTime = date+' '+time;
    console.log(dateTime)
    return dateTime
}

async function accessSpreadsheet() {
    // spreadsheet key is the long id in the sheets URL  
    return await doc.useServiceAccountAuth(require('./credentials/client_secret.json'));
}

async function readInfo() {
    return await doc.loadInfo()
}

async function addCheckIn (sheet, employee) {
    const time = getDate()
    return await sheet.addRow({ Employee: employee, Checkin: time, Checkout: null })
} 

async function addCheckOut (sheet, employee) {
    const time = getDate()
    return await sheet.addRow({ Employee: employee, Checkin: null, Checkout: time })
} 

async function checkin (employee) {
    await accessSpreadsheet()
    await readInfo()
    const sheet = doc.sheetsByIndex[0]
    await addCheckIn(sheet, employee)
    return await ('Successfull checked in')
}

async function checkout (employee) {
    await accessSpreadsheet()
    await readInfo()
    const sheet = doc.sheetsByIndex[0]
    await addCheckOut(sheet, employee)
    return await ('Successfull checked out')
}

exports.checkin = checkin
exports.checkout = checkout