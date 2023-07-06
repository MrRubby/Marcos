import { ActivityType } from "discord.js"
import register_commands from "../utils/Bot/register_commands.js"
import { joinVoiceChannel  } from '@discordjs/voice'
import { fetch, update, fetchAll, deleteOne } from "../utils/database/mongoose.js"

export default client => {

    client.once("ready", () => {

        register_commands(client, "global")

        console.log("The system was activated without any problems")

        const liste = [
            `${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString()} Provides service to the user`,
            "Do you need help ? /info",
            "Protecting the servers"
        ]

        setInterval(() => {
            const random = Math.floor(Math.random() * liste.length)
            client.user.setPresence({ activities: [{ name: liste[random], type: ActivityType.Watching}]})
        }, 10000)

        let VoiceChannel = process.env.SECRET_VOICE_CHANNEL_ID
        let VoiceGuild = process.env.SECRET_VOICE_GUILD_ID
        joinVoiceChannel({channelId: VoiceChannel, guildId: VoiceGuild,
        adapterCreator: client.guilds.cache.get(VoiceGuild).voiceAdapterCreator});
    })
}