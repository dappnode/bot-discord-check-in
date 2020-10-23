const fs = require('fs')
const sheets = require('./google-sheets')
const Discord = require('discord.js')

//test structury

const client = new Discord.Client()

const token = fs.readFileSync('./credentials/discord-token.txt', 'utf8').trim() //delete spaces
// seen all elements inside string {}

client.login(token)
 
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)
})
client.on('message', msg => {
  console.log(msg)
  const args = msg.content.split(' ')

  if (msg.content === 'ping') {
    msg.reply('hey DappNodeTeam! you should go back to work...')
  } else if (msg.content === 'checkin') {
    const employee = loadEmployee(msg.author.username)
    sheets.checkin(employee.employee)
      .then(message => {
        msg.reply(`employee: ${employee.employee}. ${message}`)
      })
      .catch(e => {
        msg.reply(e)
      })
  } else if (msg.content === 'checkout') {
    const employee = loadEmployee(msg.author.username)
    sheets.checkout(employee.employee)
      .then(message => {
        msg.reply(`employee: ${employee.employee}. ${message}`)
      })
      .catch(e => {
        msg.reply(e)
      })
  } else if (msg.content === 'what is my avatar') {
    msg.reply(msg.author.displayAvatarURL())
  } else if (msg.content === 'who am I?'){
    const employee = loadEmployee(msg.author.username)
    msg.reply(`employee: ${employee.employee} | discord user: ${employee.discord} | employee mail: ${employee.mail}`)
  } else if (args[0] === 'add' && args[1] === 'employee') {
    addEmployee(args[2], args[3], args[4])
  } else if (args[0] === 'remove' && args[1] === 'employee') {
    removeEmployeee(args[2])
  } else if (args[0] === 'get' && args[1] === 'employees') {
    const employees = loadEmployees()
    const employeesNames = employees.map(employee => {
      return employee.employee
    }).join(', ')
    msg.reply(employeesNames)
  } else {
      return 1
  }
})

const loadEmployee = (employeeDiscord) => {
    try {
      const employees = loadEmployees()
      const employee = employees.find((employee) => employee.discord === employeeDiscord)
      return employee
    } catch (e) {
      console.log(e)
      return []
    }
}

// Pablo Mendez Royo, Ruben ..., 
const loadEmployees = () => {
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

const removeEmployeee = (discord) => {
  const employees = loadEmployees()
  const employeesToKeep = employees.filter((employee) => employee.discord !== discord)
  employees.length === employeesToKeep.length ? console.log('Employee not found!') : console.log('employee removed!')
  saveEmployees(employeesToKeep)
}

const saveEmployees = (employees) => {
  const dataJSON = JSON.stringify(employees)
  fs.writeFileSync('employees.json', dataJSON)
}

const addEmployee = (employee, discord, mail) => {
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