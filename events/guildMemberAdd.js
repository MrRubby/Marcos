import { EmbedBuilder } from "discord.js"
import database from "../utils/database/guilds_Schema.js"

export default client => {

    client.on("guildMemberAdd", async member => {
  

        const data = await database.findOne({ guild_id: member.guild.id}) || null;
        const otoRol = data ? data.autorole_id: null;

        if (otoRol) {

            member.roles.add(otoRol)

            const { welcomelog_id } = await database.findOne({ guild_id: member.guild.id }) || { welcomelog_id: null }
            if (!welcomelog_id) return
            const channel = member.guild.channels.cache.get(welcomelog_id)

            const embed = new EmbedBuilder()
            .setAuthor({name:member.user.tag,iconURL: member.user.avatarURL()})
            .setDescription(t("guildMemberAdd.description", { ns: "event", lng: member.guildLocale, user: member, time: `<t:${parseInt(member.user.createdTimestamp / 1000)}:R>`}))
            .setThumbnail(member.user.avatarURL({dynamic:true}))
            .setColor("#2ACAEA")
            .setFooter({text:`${member.guild.name}`})
            .setTimestamp()

            channel.send({ embeds: [embed] })

        } else {

            const { welcomelog_id } = await database.findOne({ guild_id: member.guild.id }) || { welcomelog_id: null }
            if (!welcomelog_id) return
            const channel = member.guild.channels.cache.get(welcomelog_id)

            const embed2 = new EmbedBuilder()
            .setAuthor({name:member.user.tag,iconURL: member.user.avatarURL()})
            .setDescription(t("guildMemberAdd.description", { ns: "event", lng: member.guildLocale, user: member, time: `<t:${parseInt(member.user.createdTimestamp / 1000)}:R>`}))
            .setThumbnail(member.user.avatarURL({dynamic:true}))
            .setColor("#2ACAEA")
            .setFooter({text:`${member.guild.name}`})
            .setTimestamp()

            channel.send({ embeds: [embed2] })

        }
    })
}