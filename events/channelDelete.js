import { EmbedBuilder } from "discord.js"
import database from "../utils/database/guilds_Schema.js"
import { t } from "i18next"

export default client => {

    client.on("channelDelete", async channel => {

      const { channellog_id } = await database.findOne({ guild_id: channel.guild.id }) || { channellog_id: null }
      if (!channellog_id) return

      const logs = channel.guild.channels.cache.get(channellog_id)

      const response = new EmbedBuilder()
      .setTitle(t("channelDelete.title", {ns: "common", lng: channel.guild.locale}))
      .setDescription(t("channelDelete.description", {ns: "common", lng: channel.guild.locale}))
      .setThumbnail(channel.guild.iconURL({ dynamic: true}))
      .addFields([
          { name: t("channelDelete.addFields.channelName", {ns: "common", lng: channel.guild.locale}), value: `${channel.name}`, inline: true },
          { name: t("channelDelete.addFields.channelType", {ns: "common", lng: channel.guild.locale}), value: `${String(channel.type)
          .replace(0,t("channelDelete.addFields.replace0", {ns: "common", lng: channel.guild.locale}))
          .replace(2,t("channelDelete.addFields.replace2", {ns: "common", lng: channel.guild.locale}))
          .replace(4,t("channelDelete.addFields.replace4", {ns: "common", lng: channel.guild.locale}))
          .replace(5,t("channelDelete.addFields.replace5", {ns: "common", lng: channel.guild.locale}))
          .replace(11,t("channelDelete.addFields.replace11", {ns: "common", lng: channel.guild.locale}))
          .replace(13,t("channelDelete.addFields.replace13", {ns: "common", lng: channel.guild.locale}))
          .replace(14,t("channelDelete.addFields.replace14", {ns: "common", lng: channel.guild.locale}))
          .replace(15,t("channelDelete.addFields.replace15", {ns: "common", lng: channel.guild.locale}))}`, inline: true },
          { name: t("channelDelete.channelID", {ns: "common", lng: channel.guild.locale}), value: `${channel.id}`, inline: true },
          { name: t("channelDelete.createTime", {ns: "common", lng: channel.guild.locale}), value: `<t:${parseInt(channel.createdTimestamp / 1000)}:R>`, inline: true },
          { name: t("channelDelete.NSFW", {ns: "common", lng: channel.guild.locale}) ,value:`${channel.nsfw ? t("open", {ns: "common", lng: channel.guild.locale}) : t("close", {ns: "common", lng: channel.guild.locale})}`,inline:true},
      ])
      .setColor("Green")
      .setFooter({text:`${channel.guild.name}`})
      .setTimestamp()

      logs.send({ embeds: [response]})

    })

}