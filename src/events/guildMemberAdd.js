import { EmbedBuilder } from "discord.js"
import guilds_Schema from "../utils/database/guilds_Schema.js"

export default client => {

    client.on("guildMemberAdd", async member => {

        const data = await guilds_Schema.findOne({ guild_id: member.guild.id}) || null
        const otoRol = data ? data.roleID: null
        if (!otoRol) return
        member.roles.add(otoRol)
  
        const { welcomelog_id } = await model.findOne({ guild_id: member.guild.id }) || { welcomelog_id: null }
        if (!welcomelog_id) return
        const channel = member.guild.channels.cache.get(welcomelog_id)

        channel.send({
            embeds: [new EmbedBuilder()
              .setAuthor({name:member.user.tag,iconURL: member.user.avatarURL()})
              .setDescription(`**${member}** adlı kullanıcı sunucuya katıldı!
              Hesap Oluşturulma Tarihi: <t:${parseInt(member.user.createdTimestamp / 1000)}:R>`)
              .setThumbnail(member.user.avatarURL({dynamic:true}))
              .setColor("#2ACAEA")
              .setFooter({text:`${member.guild.name}`})
              .setTimestamp()]})
    })

}