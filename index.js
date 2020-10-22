const fs = require('fs')

const Discord = require('discord.js');
const client = new Discord.Client();
 
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});
 
client.on('message', msg => {
  if (msg.content === 'ping') {
    msg.reply('hey DappNodeTeam! this is a test');
  } else if (msg.content === 'checkin') {
    console.log(msg.author)
    const employee = loadEmployees(msg.author.username)
    console.log(employee)
    msg.reply(`employee: ${employee.employee} | discord user: ${employee.discord} | employee mail: ${employee.mail}`)
  } else if (msg.content === 'checkout') {
    const employee = loadEmployees(msg.author.username)
    msg.reply(`employee: ${employee.employee} | discord user: ${employee.discord} | employee mail: ${employee.mail}`)
  } else if (msg.content === 'what is my avatar') {
    // Send the user's avatar URL
    msg.reply(msg.author.displayAvatarURL());
  } else if (msg.content === 'who am I?'){
    const employee = loadEmployees(msg.author.username)
    msg.reply(`employee: ${employee.employee} | discord user: ${employee.discord} | employee mail: ${employee.mail}`)
  } else if (msg.content === '!rip') {
    // Create the attachment using MessageAttachment
    const attachment = new MessageAttachment('https://i.imgur.com/w3duR07.png');
    // Send the attachment in the message channel
    message.channel.send(attachment);
  } else {
      return 1
  }
}); 

//const token = fs.readFileSync('./credentials/discord-token.txt').toString()
const token = "NzY4NzI1NDczMjY5MTIxMDI1.X5EpYw.EgvNcDLjlp8KIC-AcQSB-0-qHLk"

const loadEmployees = (employeeDiscord) => {
    try {
        const dataBuffer = fs.readFileSync('employees.json')
        const dataString = dataBuffer.toString()
        const dataJson = JSON.parse(dataString)
        const employee = dataJson.find((employee) => employee.discord === employeeDiscord)
        return employee
    } catch (e) {
        return []
    }
}

/* const discord = 'pablomendez_95'
const employee = loadEmployees(discord)
console.log(employee) */

client.login(token);
