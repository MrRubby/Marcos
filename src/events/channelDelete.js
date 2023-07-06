import { EmbedBuilder } from "discord.js"
import guilds_Schema from "../utils/database/guilds_Schema.js"

export default client => {

    client.on("channelDelete", async channel => {

        const { channellog_id } = await guilds_Schema.findOne({ guild_id: channel.guild.id }) || { channellog_id: null }
        if (!channellog_id) return

        const logs = channel.guild.channels.cache.get(channellog_id)

        const response = new EmbedBuilder()
        .setTitle("Kanal Silindi")
          .setDescription(`**Az önce sunucunda bir kanal silindi. Silinen kanal detayları aşağıda görüntülenmektedir.**`)
          .setThumbnail(channel.client.user.avatarURL({ dynamic: true}))
          .addFields([
            { name: "Kanal Adı", value: `${channel.name}`, inline: true },
            { name: "Kanal Tipi", value: `${String(channel.type)
            .replace(0,"Yazı Kanalı")
            .replace(2,"Ses Kanalı")
            .replace(4,"Kategori")
            .replace(5,"Duyuru Kanalı")
            .replace(11,"Herkese Açık Alt Başlık Kanalı")
            .replace(13,"Sahne Kanalı")
            .replace(14,"Rehber Kanalı")
            .replace(15,"Forum Kanalı")}`, inline: true },
            { name: "Kanal ID", value: `${channel.id}`, inline: true },
            { name: "Olusturulma Tarihi", value: `<t:${parseInt(channel.createdTimestamp / 1000)}:R>`, inline: true },
            { name:"NSFW",value:`${channel.nsfw ? "✅ Açık" : "❌ Kapalı"}`,inline:true},
          ])
          .setColor("Red")
          .setFooter({text:`${channel.guild.name}`})
          .setTimestamp()

          logs.send({ embeds: [response]})

    })

}