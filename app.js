import { Client, Collection, GatewayIntentBits, Partials, } from "discord.js"
import { readdirSync } from "fs"
import mongoose from "mongoose"
import i18next from "i18next"
import translationBackend from "i18next-fs-backend"
import * as database from "./utils/database/mongoose.js"
import 'dotenv/config'

import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const CONFİG = require('./config.json');

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
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildPresences,
    ]
})

// Assignment (Görevlendirme
client.commands = new Collection
client.database = database

// Initialize Database (Veritabanı Başlatma)
await mongoose.connect(CONFİG.BOT.MONGO || process.env.MONGO)
.then(() => {
    console.log("Database connection was successful")
})

// Initialize Multi Language (Çoklu Dili Başlatma)
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

// Event Loader (Olay Yükleyici)
readdirSync("./events").forEach(async file => {
    const event = await import(`./events/${file}`).then(m => m.default)
    event(client)
})

// Command Loader (Komut Yükleyici)
readdirSync("./commands").forEach(category => {

    readdirSync(`./commands/${category}`).forEach(async file => {
        const command = await import(`./commands/${category}/${file}`)
        client.commands.set(command.data.name, command)
    })
})

client.login(CONFİG.BOT.TOKEN || process.env.TOKEN)