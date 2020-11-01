# Discord Bot -> DAppnodeChannel

This repo contains the logic of a discord bot to handle stuff related with DAppNode, such as the checkin and the checkout of their employees.

## Use instructions

As any other chatbot, you must type a few commands to interact with the bot. The following list shows the command and the corresponding action of the bot.

| Command                                       | Bot action                                                                         |
| --------------------------------------------- | ---------------------------------------------------------------------------------- |
| ping                                          | returns the message: 'hey DappNodeTeam! you should go back to work...'             |
| checkin                                       | Register in a google sheet the employee checkin with the current date & time       |
| checkout                                      | Register in a google sheet the employee checkout with the current date & time      |
| what is my avatar                             | returns a message with the avatar of the user                                      |
| who am I?                                     | returns the employee name, discord user and mail of the message sender             |
| add employee <name> <discord username> <mail> | Adds a new employee of the database (specifying 1.name 2.discord user and 3. mail) |
| remove employee <discord username>            | Removes an employee (specifying the discord username)                              |
| get employees                                 | returns a list with all of the employees registered                                |
