import fs from "fs"

export interface Employee {
  name: string
  discord: string
  mail: string
}

export function loadEmployee (employeeDiscord: string): Employee {
      const employees = loadEmployees()
      const employee = employees.find((employee) => employee.discord === employeeDiscord)
      if (employee) {
        return employee
      } else {
        throw Error('Employee does not exists ' + employeeDiscord)
      }
}

export function loadEmployees (): Employee[] {
  try {
    const jsonString = fs.readFileSync('employees.json', 'utf8')
    if (!jsonString) {
      return []
    }
    return  JSON.parse(jsonString)
  } catch (e) {
    if (e.code === 'ENOENT') {
      return []
    } else {
      throw e
    }
  }
}

export function removeEmployee (discord: string) {
  const employees = loadEmployees()
  const employeesToKeep = employees.filter((employee: Employee) => employee.discord !== discord)
  employees.length === employeesToKeep.length ? console.log('Employee not found!') : console.log('employee removed!')
  saveEmployees(employeesToKeep)
}

export function saveEmployees (employees: Employee[]) {
  const dataJSON = JSON.stringify(employees, null, 2) //prettier
  fs.writeFileSync('employees.json', dataJSON)
}

export function addEmployee (employee: string, discord: string, mail: string) {
  const employees = loadEmployees()
  const ducplicateEmployee = employees.find((employee: Employee) => employee.discord === discord)

  if (!ducplicateEmployee) {
    employees.push({
        name: employee,
        discord: discord,
        mail: mail
    })
    saveEmployees(employees)
    console.log('New employee added!')
  } else {
      console.log('Note employee taken')
  }
}