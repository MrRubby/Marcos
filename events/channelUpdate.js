import { EmbedBuilder } from "discord.js"
import database from "../utils/database/guilds_Schema.js"
import { t } from "i18next"

export default client => {

  client.on("channelUpdate", async (oldChannel, newChannel) => {

    const { channellog_id } = await database.findOne({ guild_id: oldChannel.guild.id }) || { channellog_id: null }
    if (!channellog_id) return

    const logs = oldChannel.guild.channels.cache.get(channellog_id)

    const response = new EmbedBuilder()
    .setTitle(t("channelUpdate.title", {ns: "common", lng: oldChannel.guild.locale}))
    .setDescription(t("channelUpdate.description", {ns: "common", lng: oldChannel.guild.locale}))
    .setThumbnail(oldChannel.guild.iconURL({ dynamic: true}))
    .addFields([
      { name: t("channelUpdate.addFields.channelName", {ns: "common", lng: oldChannel.guild.locale}), value: `${oldChannel.name}`, inline: true },
      { name: t("channelUpdate.addFields.channelType", {ns: "common", lng: oldChannel.guild.locale}), value: `${String(oldChannel.type)
      .replace(0,t("channelUpdate.addFields.replace0", {ns: "common", lng: oldChannel.guild.locale}))
      .replace(2,t("channelUpdate.addFields.replace2", {ns: "common", lng: oldChannel.guild.locale}))
      .replace(4,t("channelUpdate.addFields.replace4", {ns: "common", lng: oldChannel.guild.locale}))
      .replace(5,t("channelUpdate.addFields.replace5", {ns: "common", lng: oldChannel.guild.locale}))
      .replace(11,t("channelUpdate.addFields.replace11", {ns: "common", lng: oldChannel.guild.locale}))
      .replace(13,t("channelUpdate.addFields.replace13", {ns: "common", lng: oldChannel.guild.locale}))
      .replace(14,t("channelUpdate.addFields.replace14", {ns: "common", lng: oldChannel.guild.locale}))
      .replace(15,t("channelUpdate.addFields.replace15", {ns: "common", lng: oldChannel.guild.locale}))}`, inline: true },
      { name: t("channelUpdate.channelID", {ns: "common", lng: oldChannel.guild.locale}), value: `${newChannel.id}`, inline: true },
      { name: t("channelUpdate.createTime", {ns: "common", lng: oldChannel.guild.locale}), value: `<t:${parseInt(newChannel.createdTimestamp / 1000)}:R>`, inline: true },
      { name: t("channelUpdate.NSFW", {ns: "common", lng: oldChannel.guild.locale}) ,value:`${oldChannel.nsfw ? t("open", {ns: "common", lng: oldChannel.guild.locale}) : t("close", {ns: "common", lng: oldChannel.guild.locale})}`,inline:true},
    ])

    .addFields([
      { name: t("channelUpdate.addFields.channelName2", {ns: "common", lng: newChannel.guild.locale}), value: `${newChannel.name}`, inline: true },
      { name: t("channelUpdate.addFields.channelType2", {ns: "common", lng: newChannel.guild.locale}), value: `${String(newChannel.type)
      .replace(0,t("channelUpdate.addFields.replace0", {ns: "common", lng: newChannel.guild.locale}))
      .replace(2,t("channelUpdate.addFields.replace2", {ns: "common", lng: newChannel.guild.locale}))
      .replace(4,t("channelUpdate.addFields.replace4", {ns: "common", lng: newChannel.guild.locale}))
      .replace(5,t("channelUpdate.addFields.replace5", {ns: "common", lng: newChannel.guild.locale}))
      .replace(11,t("channelUpdate.addFields.replace11", {ns: "common", lng: newChannel.guild.locale}))
      .replace(13,t("channelUpdate.addFields.replace13", {ns: "common", lng: newChannel.guild.locale}))
      .replace(14,t("channelUpdate.addFields.replace14", {ns: "common", lng: newChannel.guild.locale}))
      .replace(15,t("channelUpdate.addFields.replace15", {ns: "common", lng: newChannel.guild.locale}))}`, inline: true },
      { name: t("channelUpdate.updateTime", {ns: "common", lng: newChannel.guild.locale}), value: `<t:${parseInt(new Date() / 1000)}:R>`, inline: true },
      { name: t("channelUpdate.NSFW", {ns: "common", lng: newChannel.guild.locale}),value:`${newChannel.nsfw ? t("open", {ns: "common", lng: newChannel.guild.locale}) : t("close", {ns: "common", lng: newChannel.guild.locale})}`,inline:true},
    ])

    .setColor("Orange")
    .setFooter({text:`${oldChannel.guild.name}`})
    .setTimestamp()

    logs.send({ embeds: [response]})

  })

}