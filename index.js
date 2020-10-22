const fs = require('fs')
const sheets = require('./google-sheets')
const Discord = require('discord.js')

const client = new Discord.Client()

const token = fs.readFileSync('./credentials/discord-token.txt', 'utf8').trim() //delete spaces
// seen all elements inside string {}

client.login(token)
 
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)
})
 
client.on('message', msg => {
  if (msg.content === 'ping') {
    msg.reply('hey DappNodeTeam! this is a test')
  } else if (msg.content === 'checkin') {

    const employee = loadEmployees(msg.author.username)
    sheets.checkin(employee.employee)
      .then(message => {
        msg.reply(`employee: ${employee.employee} | discord user: ${employee.discord} | employee mail: ${employee.mail}. ${message}`)
      })
      .catch(e => {
        msg.reply(e)
      })

  } else if (msg.content === 'checkout') {

    const employee = loadEmployees(msg.author.username)
    sheets.checkin(employee.employee)
      .then(message => {
        msg.reply(`employee: ${employee.employee} | discord user: ${employee.discord} | employee mail: ${employee.mail}. ${message}`)
      })
      .catch(e => {
        msg.reply(e)
      })

  } else if (msg.content === 'what is my avatar') {

    msg.reply(msg.author.displayAvatarURL())
  } else if (msg.content === 'who am I?'){
    const employee = loadEmployees(msg.author.username)
    msg.reply(`employee: ${employee.employee} | discord user: ${employee.discord} | employee mail: ${employee.mail}`)
  } else if (msg.content === '!rip') {
    const attachment = new MessageAttachment('https://i.imgur.com/w3duR07.png');
    message.channel.send(attachment)
  } else {
      return 1
  }
})

const loadEmployees = (employeeDiscord) => {
    try {
        const dataBuffer = fs.readFileSync('employees.json', 'utf8')
        const dataJson = JSON.parse(dataBuffer)
        const employee = dataJson.find((employee) => employee.discord === employeeDiscord)
        return employee
    } catch (e) {
        return []
    }
}