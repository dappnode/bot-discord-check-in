import fs from 'fs'
import { GoogleSpreadsheet, GoogleSpreadsheetWorksheet } from "google-spreadsheet"

const googleID = process.env.DOC_GOOGLE_SPREADSHEET || fs.readFileSync('./credentials/google-spreadsheet.txt', 'utf8').trim()
const doc = new GoogleSpreadsheet(googleID);

const getDate = function () {
    const today = new Date()
    const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const dateTime = date+' '+time;
    return dateTime
}

async function accessSpreadsheet() {
    // spreadsheet key is the long id in the sheets URL  
    return await doc.useServiceAccountAuth(require('./credentials/client_secret.json'));
}

async function readInfo() {
    return await doc.loadInfo()
}
// sheet what type of "data is??"
async function addCheckIn (sheet: GoogleSpreadsheetWorksheet, employee: string) {
    const time = getDate()
    return await sheet.addRow({ Employee: employee, Checkin: time, Checkout: '' })
} 

async function addCheckOut (sheet: GoogleSpreadsheetWorksheet, employee: string) {
    const time = getDate()
    return await sheet.addRow({ Employee: employee, Checkin: '', Checkout: time })
} 

export async function checkin (employee: string): Promise<string> {
    await accessSpreadsheet()
    await readInfo()
    const sheet = doc.sheetsByIndex[0]
    await addCheckIn(sheet, employee)
    return 'Successfull checked in'
}

export async function checkout (employee: string): Promise<string> {
    await accessSpreadsheet()
    await readInfo()
    const sheet = doc.sheetsByIndex[0]
    await addCheckOut(sheet, employee)
    return 'Successfull checked out'
}