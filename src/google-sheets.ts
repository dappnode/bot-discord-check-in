import { GoogleSpreadsheet, GoogleSpreadsheetWorksheet, GoogleSpreadsheetRow } from "google-spreadsheet"
import { clientSecretJson, googleID } from './params'

export interface Employee {
    name: string
    discord: string
    mail: string
  }

export const doc = new GoogleSpreadsheet(googleID);
if (!doc) {
    throw Error ('the doc must exists')
}

export const getDate = function () {
    const today = new Date()
    const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const dateTime = date+' '+time;
    return dateTime
}

export async function accessSpreadsheet() {
    return await doc.useServiceAccountAuth(clientSecretJson);
}

export async function readInfo() {
    return await doc.loadInfo() // Loads sheets
}

// FIRST SHEET (CHECK-in CHECK-out)

async function addCheckIn (sheet: GoogleSpreadsheetWorksheet, employee: string) {
    const time = getDate()
    return await sheet.addRow({ Employee: employee, Checkin: time, Checkout: '' })
} 

async function addCheckOut (sheet: GoogleSpreadsheetWorksheet, employee: string) {
    const time = getDate()
    return await sheet.addRow({ Employee: employee, Checkin: '', Checkout: time })
} 

export async function checkin (employeeName: string): Promise<string> {
    await accessSpreadsheet()
    await readInfo()
    const sheet = doc.sheetsByIndex[0]
    await addCheckIn(sheet, employeeName)
    return 'Successfull checked in'
}

export async function checkout (employeeName: string): Promise<string> {
    await accessSpreadsheet()
    await readInfo()
    const sheet = doc.sheetsByIndex[0]
    await addCheckOut(sheet, employeeName)
    return 'Successfull checked out'
}

export async function getChecks () {
    await accessSpreadsheet()
    await readInfo()
    const sheet = doc.sheetsByIndex[0]
    return await sheet.getRows()
}

// SECOND SHEET (EMPLOYEES)

export async function getEmployeesRows (): Promise<GoogleSpreadsheetRow[]> {
    await accessSpreadsheet()
    await readInfo()
    const sheet = doc.sheetsByIndex[1]
    return await sheet.getRows()
}

export async function getEmployees (): Promise<Employee[]> {
    const rows = await getEmployeesRows()
    let employees = []
    for (let i = 0; i < rows.length; i ++) {
        employees.push({name: rows[i].Name, discord: rows[i].Discord, mail: rows[i].Mail})
    }
    return employees
}

export async function addEmployee (name: string, discord: string, mail: string): Promise<void> {
    await accessSpreadsheet()
    await readInfo()
    const sheet = doc.sheetsByIndex[1]
    await sheet.addRow({ Name: name, Discord: discord, Mail: mail })
} 

export async function removeEmployee(name: string): Promise<void> {
    const employeeRow = await getEmployeeRow(name, undefined)
    await employeeRow.delete()
}  

export async function getEmployee(discord: string): Promise<Employee> {
    const employeeRow = await getEmployeeRow(undefined, discord)
    return {name: employeeRow.Name, discord: employeeRow.Discord, mail: employeeRow.Mail }
}

async function getEmployeeRow (name?: string, discord?:string) {
    const rows = await getEmployeesRows()
    let employeeRow 
    if (name) {
        employeeRow = rows.find(row => row.Name === name)
    } else {
        employeeRow = rows.find(row => row.Discord === discord)
    }
    if (employeeRow) {
        return employeeRow
    } else {
        throw Error (`Employee ${name || discord} not found`)
    }
}