import { EmbedBuilder } from "discord.js"
import database from "../utils/database/guilds_Schema.js"
import { t } from "i18next"

export default client => {

  client.on("channelUpdate", async (oldChannel, newChannel) => {

    const { channellog_id } = await database.findOne({ guild_id: oldChannel.guild.id }) || { channellog_id: null }
    if (!channellog_id) return

    const logs = oldChannel.guild.channels.cache.get(channellog_id)

    const response = new EmbedBuilder()
    .setTitle(t("channelUpdate.title", {ns: "event", lng: oldChannel.guildLocale}))
    .setDescription(t("channelUpdate.description", {ns: "event", lng: oldChannel.guildLocale}))
    .setThumbnail(oldChannel.guild.iconURL({ dynamic: true}))
    .addFields([
      { name: t("channelUpdate.addFields.channelName", {ns: "event", lng: oldChannel.guildLocale}), value: `${oldChannel.name}`, inline: true },
      { name: t("channelUpdate.addFields.channelType", {ns: "event", lng: oldChannel.guildLocale}), value: `${String(oldChannel.type)
      .replace(0,t("channelUpdate.addFields.replace0", {ns: "event", lng: oldChannel.guildLocale}))
      .replace(2,t("channelUpdate.addFields.replace2", {ns: "event", lng: oldChannel.guildLocale}))
      .replace(4,t("channelUpdate.addFields.replace4", {ns: "event", lng: oldChannel.guildLocale}))
      .replace(5,t("channelUpdate.addFields.replace5", {ns: "event", lng: oldChannel.guildLocale}))
      .replace(11,t("channelUpdate.addFields.replace11", {ns: "event", lng: oldChannel.guildLocale}))
      .replace(13,t("channelUpdate.addFields.replace13", {ns: "event", lng: oldChannel.guildLocale}))
      .replace(14,t("channelUpdate.addFields.replace14", {ns: "event", lng: oldChannel.guildLocale}))
      .replace(15,t("channelUpdate.addFields.replace15", {ns: "event", lng: oldChannel.guildLocale}))}`, inline: true },
      { name: t("channelUpdate.channelID", {ns: "event", lng: oldChannel.guildLocale}), value: `${newChannel.id}`, inline: true },
      { name: t("channelUpdate.createTime", {ns: "event", lng: oldChannel.guildLocale}), value: `<t:${parseInt(newChannel.createdTimestamp / 1000)}:R>`, inline: true },
      { name: t("channelUpdate.NSFW", {ns: "event", lng: oldChannel.guildLocale}) ,value:`${oldChannel.nsfw ? t("open", {ns: "common", lng: oldChannel.guildLocale}) : t("close", {ns: "common", lng: oldChannel.guildLocale})}`,inline:true},
    ])

    .addFields([
      { name: t("channelUpdate.addFields.channelName2", {ns: "event", lng: newChannel.guildLocale}), value: `${newChannel.name}`, inline: true },
      { name: t("channelUpdate.addFields.channelType2", {ns: "event", lng: newChannel.guildLocale}), value: `${String(newChannel.type)
      .replace(0,t("channelUpdate.addFields.replace0", {ns: "event", lng: newChannel.guildLocale}))
      .replace(2,t("channelUpdate.addFields.replace2", {ns: "event", lng: newChannel.guildLocale}))
      .replace(4,t("channelUpdate.addFields.replace4", {ns: "event", lng: newChannel.guildLocale}))
      .replace(5,t("channelUpdate.addFields.replace5", {ns: "event", lng: newChannel.guildLocale}))
      .replace(11,t("channelUpdate.addFields.replace11", {ns: "event", lng: newChannel.guildLocale}))
      .replace(13,t("channelUpdate.addFields.replace13", {ns: "event", lng: newChannel.guildLocale}))
      .replace(14,t("channelUpdate.addFields.replace14", {ns: "event", lng: newChannel.guildLocale}))
      .replace(15,t("channelUpdate.addFields.replace15", {ns: "event", lng: newChannel.guildLocale}))}`, inline: true },
      { name: t("channelUpdate.updateTime", {ns: "event", lng: newChannel.guildLocale}), value: `<t:${parseInt(new Date() / 1000)}:R>`, inline: true },
      { name: t("channelUpdate.NSFW", {ns: "event", lng: newChannel.guildLocale}),value:`${newChannel.nsfw ? t("open", {ns: "common", lng: newChannel.guildLocale}) : t("close", {ns: "common", lng: newChannel.guildLocale})}`,inline:true},
    ])

    .setColor("Orange")
    .setFooter({text:`${oldChannel.guild.name}`})
    .setTimestamp()

    logs.send({ embeds: [response]})

  })

}