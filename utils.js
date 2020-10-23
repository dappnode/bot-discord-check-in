function loadEmployee (employeeDiscord) {
    try {
      const employees = loadEmployees()
      const employee = employees.find((employee) => employee.discord === employeeDiscord)
      return employee
    } catch (e) {
      console.log(e)
      return []
    }
}

function loadEmployees () {
  try {
    const jsonString = fs.readFileSync('employees.json', 'utf8')
    if (!jsonString) {
      return []
    }
    return  JSON.parse(jsonString)
  } catch (e) {
    if (e.code === 'ENONENT') {
      return []
    }
    console.log(e)
  }
}

function removeEmployee (discord) {
  const employees = loadEmployees()
  const employeesToKeep = employees.filter((employee) => employee.discord !== discord)
  employees.length === employeesToKeep.length ? console.log('Employee not found!') : console.log('employee removed!')
  saveEmployees(employeesToKeep)
}

function saveEmployees (employees) {
  const dataJSON = JSON.stringify(employees, null, 2) //prettier
  fs.writeFileSync('employees.json', dataJSON)
}

function addEmployee (employee, discord, mail) {
  const employees = loadEmployees()
  const ducplicateEmployee = employees.find((employee) => employee.discord === discord)

  if (!ducplicateEmployee) {
    employees.push({
        employee: employee,
        discord: discord,
        mail, mail
    })
    saveEmployees(employees)
    console.log('New employee added!')
  } else {
      console.log('Note employee taken')
  }
}

exports.loadEmployee = loadEmployee
exports.loadEmployees = loadEmployees
exports.removeEmployee = removeEmployee
exports.addEmployee = addEmployee