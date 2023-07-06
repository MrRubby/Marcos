import { EmbedBuilder } from "discord.js"
import guilds_Schema from "../utils/database/guilds_Schema.js"

export default client => {

    client.on("guildBanRemove", async (_,ban) => {

        const { modlog_id } = await guilds_Schema.findOne({ guild_id: ban.guild.id }) || { modlog_id: null }
        if (!modlog_id) return

        const channel = ban.guild.channels.cache.get(modlogChannel)
        channel.send({
            embeds: [new EmbedBuilder()
              .setAuthor({name:ban.user.tag,iconURL: ban.user.avatarURL()})
              .setDescription(`**${ban.user}** adlı kullanıcı sunucudan yasağı kaldırıldı!`)
              .addFields({name:"Yasaklama sebebi",value:`\`\`\`${ban.reason}\`\`\``,inline:false})
              .setColor("#2ACAEA")
              .setFooter({text:`${ban.guild.name}`})
              .setTimestamp()
            ]
          })
    })

}