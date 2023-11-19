import { ActivityType, EmbedBuilder } from "discord.js"
import register_commands from "../utils/bot/register_commands.js"
import { joinVoiceChannel  } from '@discordjs/voice'
import { fetch, update, fetchAll, deleteOne } from "../utils/database/mongoose.js"

const { default: CONFİG } = await import("../utils/bot/config.json", {
    assert: {
      type: "json",
    },
  });

export default client => {

    client.once("ready", async () => {

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

        let VoiceChannel = CONFİG.LOG.VOICE_CHANNEL_ID
        let VoiceGuild = CONFİG.LOG.VOICE_GUILD_ID
        joinVoiceChannel({channelId: VoiceChannel, guildId: VoiceGuild,
        adapterCreator: client.guilds.cache.get(VoiceGuild).voiceAdapterCreator});
    })
}