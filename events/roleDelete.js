import { EmbedBuilder } from "discord.js"
import database from "../utils/database/guilds_Schema.js"

export default client => {

    client.on("roleDelete", async (role) => {

        const { rolelog_id } = await database.findOne({ guild_id: role.guild.id }) || { rolelog_id: null}
        if(!rolelog_id) return

        const channel = role.guild.channels.cache.get(rolelog_id)

        channel.send({
            embeds: [new EmbedBuilder()
            .setTitle(t("roleDelete.title", { ns: "event", lng: role.guildLocale}))
            .setDescription(t("roleDelete.description", { ns: "event", lng: role.guildLocale}))
            .setThumbnail(role.client.user.avatarURL({ dynamic: true}))
            .addFields(
            {name : t("roleDelete.addFields.roleName", { ns: "event", lng: role.guildLocale}) ,value:role.name,inline:true},
            {name : t("roleDelete.addFields.roleColor", { ns: "event", lng: role.guildLocale}) ,value:`${role.hexColor}`,inline:true},
            {name : t("roleDelete.addFields.roleIcon", { ns: "event", lng: role.guildLocale}) ,value:role.iconURL() ? `${t("roleDelete.addFields.roleName", { ns: "event", lng: role.guildLocale})}(${role.iconURL()})` : t("roleDelete.addFields.noneIcon", { ns: "event", lng: role.guildLocale}) ,inline:true},
            {name : t("roleDelete.addFields.createTime", { ns: "event", lng: role.guildLocale}) ,value:`<t:${parseInt(role.createdTimestamp / 1000)}:R>`,inline:true})
            .setColor("Red")
            .setFooter({text:`${role.guild.name}`})
            .setTimestamp()
        ]})

    })

}