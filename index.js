const fs = require('fs')
const sheets = require('./google-sheets')
const {loadEmployee, loadEmployees, removeEmployee, addEmployee} = require('./utils')
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
  try {
    const args = msg.content.split(' ')
    if (msg.content === 'ping') {
      msg.reply('hey DappNodeTeam! you should go back to work...')
    } else if (msg.content === 'checkin') {
      const employee = loadEmployee(msg.author.username)
      const message = await sheets.checkin(employee.name)
      msg.reply(`employee: ${employee.name}. ${message}`)
    } else if (msg.content === 'checkout') {
      const employee = loadEmployee(msg.author.username)
      const message = await sheets.checkout(employee.name)
      msg.reply(`employee: ${employee.name}. ${message}`)
    } else if (msg.content === 'what is my avatar') {
      msg.reply(msg.author.displayAvatarURL())
    } else if (msg.content === 'who am I?'){
      const employee = loadEmployee(msg.author.username)
      msg.reply(`employee: ${employee.name} | discord user: ${employee.discord} | employee mail: ${employee.mail}`)
    } else if (args[0] === 'add' && args[1] === 'employee') {
      addEmployee(args[2], args[3], args[4])
    } else if (args[0] === 'remove' && args[1] === 'employee') {
      removeEmployee(args[2])
    } else if (args[0] === 'get' && args[1] === 'employees') {
      const employees = loadEmployees()
      const employeesNames = employees.map(employee => {
        return employee.name
      }).join(', ')
      msg.reply(employeesNames)
    } else {
        return 1
    }
  } catch (e) {
    console.log(e)
    msg.reply(e.message)
  }  
})