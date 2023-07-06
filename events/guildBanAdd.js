import { EmbedBuilder } from "discord.js"
import guilds_Schema from "../utils/database/guilds_Schema.js"

export default client => {

    client.on("guildBanAdd", async (_,ban) => {

        const { modlog_id } = await guilds_Schema.findOne({ guild_id: ban.guild.id }) || { modlog_id: null }
        if (!modlog_id) return

        const logs = ban.guild.channels.cache.get(modlog_id)

        const response = new EmbedBuilder()
        .setAuthor({name:ban.user.tag,iconURL: ban.user.avatarURL()})
        .setDescription(`**${ban.user}** adlı kullanıcı sunucudan yasaklandı!`)
        .addFields({name:"Yasaklama sebebi",value:`\`\`\`${ban.reason}\`\`\``,inline:false})
        .setColor("#2ACAEA")
        .setFooter({text:`${ban.guild.name}`})
        .setTimestamp()
        logs.send({ embeds: [response]})

    })

}