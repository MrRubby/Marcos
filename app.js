import { Client, Collection, GatewayIntentBits, Partials } from "discord.js"
import { readdirSync } from "fs"
import i18next from "i18next"
import translationBackend from "i18next-fs-backend"
import mongoose from "mongoose"
import * as database from "./utils/database/mongoose.js"
import 'dotenv/config'
const client = new Client({
    partials: [
        Partials.Channel,
        Partials.GuildMember,
        Partials.User,
        Partials.Message,
        Partials.Reaction,
    ],
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildIntegrations,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildMessages,
    ]
})

// Assignment
client.commands = new Collection
client.embed = await import("./utils/Bot/embeds.js").then(e => e.default)
client.database = database

// Initialize Database
await mongoose.connect(process.env.MONGO)
.then(() => { 
    console.log("The database has been successfully connected!")
})

// Initialize Multi Language
await i18next
    .use(translationBackend)
    .init({
        ns: readdirSync("./locales/en-US").map(a => a.replace(".json", "")),
        defaultNS: "commands",
        fallbackLng: "en-US",
        preload: readdirSync("./locales"),
        backend: {
            loadPath: "./locales/{{lng}}/{{ns}}.json"
        }
    })

// Event Loader
readdirSync("./events").forEach(async file => {

    const event = await import(`./events/${file}`).then(m => m.default)
    event(client)

})

// Command Loader
readdirSync("./commands").forEach(category => {

    readdirSync(`./commands/${category}`).forEach(async file => {
        const command = await import(`./commands/${category}/${file}`)
        client.commands.set(command.data.name, command)
    })
})
client.login(process.env.TOKEN)