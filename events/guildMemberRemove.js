import { EmbedBuilder } from "discord.js"
import guilds_Schema from "../utils/database/guilds_Schema.js"

export default client => {

    client.on("guildMemberRemove", async member => {

        const { welcomelog_id } = await guilds_Schema.findOne({ guild_id: member.guild.id }) || { welcomelog_id: null };
        if (!welcomelog_id) return;
      
        const channel = member.guild.channels.cache.get(welcomelog_id);

        channel.send({
            embeds: [new EmbedBuilder()
              .setAuthor({name:member.user.tag,iconURL: member.user.avatarURL()})
              .setDescription(`**${member.user.tag}** adlı kullanıcı sunucudan ayrıldı!`)
              .setThumbnail(member.user.avatarURL({dynamic:true}))
              .setColor("#2ACAEA")
              .setFooter({text:`${member.guild.name}`})
              .setTimestamp()
            ]
        })
    })

}