import { EmbedBuilder } from "discord.js"
import database from "../utils/database/guilds_Schema.js"

export default client => {

    client.on("roleDelete", async (role) => {

        const { rolelog_id } = await database.findOne({ guild_id: role.guild.id }) || { rolelog_id: null}
        if(!rolelog_id) return

        const channel = role.guild.channels.cache.get(rolelog_id)

        channel.send({
            embeds: [new EmbedBuilder()
            .setTitle(t("roleDelete.title", { ns: "common", lng: role.guild.locale}))
            .setDescription(t("roleDelete.description", { ns: "common", lng: role.guild.locale}))
            .setThumbnail(role.client.user.avatarURL({ dynamic: true}))
            .addFields(
            {name : t("roleDelete.addFields.roleName", { ns: "common", lng: role.guild.locale}) ,value:role.name,inline:true},
            {name : t("roleDelete.addFields.roleColor", { ns: "common", lng: role.guild.locale}) ,value:`${role.hexColor}`,inline:true},
            {name : t("roleDelete.addFields.roleIcon", { ns: "common", lng: role.guild.locale}) ,value:role.iconURL() ? `${t("roleDelete.addFields.roleName", { ns: "common", lng: role.guild.locale})}(${role.iconURL()})` : t("roleDelete.addFields.noneIcon", { ns: "common", lng: role.guild.locale}) ,inline:true},
            {name : t("roleDelete.addFields.createTime", { ns: "common", lng: role.guild.locale}) ,value:`<t:${parseInt(role.createdTimestamp / 1000)}:R>`,inline:true})
            .setColor("Red")
            .setFooter({text:`${role.guild.name}`})
            .setTimestamp()
        ]})

    })

}