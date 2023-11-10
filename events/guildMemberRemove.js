import { EmbedBuilder } from "discord.js"
import database from "../utils/database/guilds_Schema.js"
import { t } from "i18next"

export default client => {

    client.on("guildMemberRemove", async member => {

        const { welcomelog_id } = await database.findOne({ guild_id: member.guild.id }) || { welcomelog_id: null };
        if (!welcomelog_id) return;
      
        const channel = member.guild.channels.cache.get(welcomelog_id);

        channel.send({
            embeds: [new EmbedBuilder()
              .setAuthor({name:member.user.tag,iconURL: member.user.avatarURL()})
              .setDescription(t("guildMemberRemove.descripton", { ns: "common", lng: member.guild.locale, user: member.user.tag}))
              .setThumbnail(member.user.avatarURL({dynamic:true}))
              .setColor("#2ACAEA")
              .setFooter({text:`${member.guild.name}`})
              .setTimestamp()
            ]
        })
    })

}