import { EmbedBuilder } from "discord.js"
import database from "../utils/database/guilds_Schema.js"
import { t } from "i18next"

export default client => {

    client.on("channelCreate", async channel => {

        const { channellog_id } = await database.findOne({ guild_id: channel.guild.id }) || { channellog_id: null }
        if (!channellog_id) return

        const logs = channel.guild.channels.cache.get(channellog_id)

        const response = new EmbedBuilder()
        .setTitle(t("channelCreate.title", {ns: "event", lng: channel.guildLocale}))
        .setDescription(t("channelCreate.description", {ns: "event", lng: channel.guildLocale}))
        .setThumbnail(channel.guild.iconURL({ dynamic: true}))
        .addFields([
            { name: t("channelCreate.addFields.channelName", {ns: "event", lng: channel.guildLocale}), value: `${channel.name}`, inline: true },
            { name: t("channelCreate.addFields.channelType", {ns: "event", lng: channel.guildLocale}), value: `${String(channel.type)
            .replace(0,t("channelCreate.addFields.replace0", {ns: "event", lng: channel.guildLocale}))
            .replace(2,t("channelCreate.addFields.replace2", {ns: "event", lng: channel.guildLocale}))
            .replace(4,t("channelCreate.addFields.replace4", {ns: "event", lng: channel.guildLocale}))
            .replace(5,t("channelCreate.addFields.replace5", {ns: "event", lng: channel.guildLocale}))
            .replace(11,t("channelCreate.addFields.replace11", {ns: "event", lng: channel.guildLocale}))
            .replace(13,t("channelCreate.addFields.replace13", {ns: "event", lng: channel.guildLocale}))
            .replace(14,t("channelCreate.addFields.replace14", {ns: "event", lng: channel.guildLocale}))
            .replace(15,t("channelCreate.addFields.replace15", {ns: "event", lng: channel.guildLocale}))}`, inline: true },
            { name: t("channelCreate.channelID", {ns: "event", lng: channel.guildLocale}), value: `${channel.id}`, inline: true },
            { name: t("channelCreate.createTime", {ns: "event", lng: channel.guildLocale}), value: `<t:${parseInt(channel.createdTimestamp / 1000)}:R>`, inline: true },
            { name: t("channelCreate.NSFW", {ns: "event", lng: channel.guildLocale}) ,value:`${channel.nsfw ? t("open", {ns: "event", lng: channel.guildLocale}) : t("close", {ns: "event", lng: channel.guildLocale})}`,inline:true},
        ])
        .setColor("Green")
        .setFooter({text:`${channel.guild.name}`})
        .setTimestamp()

        logs.send({ embeds: [response]})

    })

}