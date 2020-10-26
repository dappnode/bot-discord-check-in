import * as sheets from './google-sheets'
import Discord from 'discord.js'
import { discordToken } from './params'

const client = new Discord.Client()
client.login(discordToken)
 
client.on('ready', () => {
  if (client.user){
    console.log(`Logged in as ${client.user.tag}!`)
  }
})
client.on('message', async msg => {
  try {
    const args = msg.content.split(' ')
    if (msg.content === 'ping') {
      msg.reply('hey DappNodeTeam! you should go back to work...')
    } else if (msg.content === 'checkin') {
      const employee= await sheets.getEmployee(msg.author.username)
      const message = await sheets.checkin(await employee.name)
      msg.reply(`employee: ${employee.name}. ${message}`)
    } else if (msg.content === 'checkout') {
      const employee = await sheets.getEmployee(msg.author.username)
      const message = await sheets.checkout(await employee.name)
      msg.reply(`employee: ${employee.name}. ${message}`)
    } else if (msg.content === 'what is my avatar') {
      msg.reply(msg.author.displayAvatarURL())
    } else if (msg.content === 'who am I?'){
      const employee = await sheets.getEmployee(msg.author.username)
      msg.reply(`employee: ${employee.name} | discord user: ${employee.discord}| mail user: ${employee.mail}`)
    } else if (args[0] === 'get' && args[1] === 'employee') {
      const employee = await sheets.getEmployee(args[2])
      msg.reply(`Name: ${employee.name}, Discord: ${employee.discord}, mail: ${employee.mail}`)
    } else if (args[0] === 'add' && args[1] === 'employee') {
      await sheets.addEmployee(args[2], args[3], args[4])
    } else if (args[0] === 'remove' && args[1] === 'employee') {
      await sheets.removeEmployee(args[2])
    } else if (args[0] === 'get' && args[1] === 'employees') {
      const employees = await sheets.getEmployees()
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