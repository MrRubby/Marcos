import { EmbedBuilder } from "discord.js"
import database from "../utils/database/guilds_Schema.js"
import { t } from "i18next"

export default client => {

    client.on("roleCreate", async (role) => {

        const { rolelog_id } = await database.findOne({ guild_id: role.guild.id }) || { rolelog_id: null}
        if(!rolelog_id) return

        const channel = role.guild.channels.cache.get(rolelog_id)

        channel.send({
            embeds: [new EmbedBuilder()
            .setTitle(t("roleCreate.title", { ns: "event", lng: role.guildLocale}))
            .setDescription(t("roleCreate.description", { ns: "event", lng: role.guildLocale}))
            .setThumbnail(role.client.user.avatarURL({ dynamic: true}))
            .addFields(
            {name : t("roleCreate.addFields.roleName", { ns: "event", lng: role.guildLocale}) ,value:role.name,inline:true},
            {name : t("roleCreate.addFields.roleColor", { ns: "event", lng: role.guildLocale}) ,value:`${role.hexColor}`,inline:true},
            {name : t("roleCreate.addFields.roleIcon", { ns: "event", lng: role.guildLocale}) ,value:role.iconURL() ? `${t("roleCreate.addFields.roleName", { ns: "event", lng: role.guildLocale})}(${role.iconURL()})` : t("roleCreate.addFields.noneIcon", { ns: "event", lng: role.guildLocale}) ,inline:true},
            {name : t("roleCreate.addFields.createTime", { ns: "event", lng: role.guildLocale}) ,value:`<t:${parseInt(role.createdTimestamp / 1000)}:R>`,inline:true})
      
            .setColor("Green")
            .setFooter({text:`${role.guild.name}`})
            .setTimestamp()
        ]})

    })

}