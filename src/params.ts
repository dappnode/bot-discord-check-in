import dotenv from 'dotenv'
import { readFileSync } from 'fs'

dotenv.config()

// Local environment variables => Dotenv.env file
// Production environment variables => defined in the server (eg. Heroku)

// Check for TOKEN_DISCORD in the environment
if (!process.env.TOKEN_DISCORD) {
    throw Error ('TOKEN_DISCORD must exist in the environment')
}
export const discordToken = process.env.TOKEN_DISCORD

// Check for DOC_GOOGLE_SPREADSHEET in the environment
if(!process.env.DOC_GOOGLE_SPREADSHEET) {
    throw Error ('DOC_GOOGLE_SPREADSHEET must exist in the environment')
}
export const googleID = process.env.DOC_GOOGLE_SPREADSHEET

// Check for client_secret.json file in credentials folder
const clientSecret = readFileSync('./credentials/client_secret.json', 'utf-8')
if (!clientSecret) {
    throw Error ('client_secret.json file must exists')
}
export const clientSecretJson = JSON.parse(clientSecret)

/* // Check for CLIENT_SECRET in the environment. JSON file 
if (!process.env.CLIENT_SECRET) {
    throw Error ('CLIENT_SECRET must exist in the environment')
}
export const credentialsJSON = process.env.CLIENT_SECRET
export const credentials = JSON.parse(credentialsJSON)  */