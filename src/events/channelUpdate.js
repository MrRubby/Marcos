import { EmbedBuilder } from "discord.js"
import guilds_Schema from "../utils/database/guilds_Schema.js"

export default client => {

    client.on("channelUpdate", async (oldChannel, newChannel) => {

        const { channellog_id } = await guilds_Schema.findOne({ guild_id: oldChannel.guild.id }) || { channellog_id: null }
        if (!channellog_id) return

        const logs = oldChannel.guild.channels.cache.get(channellog_id)

        const response = new EmbedBuilder()
        .setTitle("Kanal Güncellendi")
          .setDescription(`**Az önce sunucunda bir kanal Güncellendi. Güncelleme detayları aşağıda görüntülenmektedir.**`)
          .setThumbnail(oldChannel.client.user.avatarURL({ dynamic: true}))
          .addFields([
            { name: "Eski Kanal Adı", value: `${oldChannel.name}`, inline: true },
            { name: "Eski Kanal Tipi", value: `${String(oldChannel.type)
            .replace(0,"Yazı Kanalı")
            .replace(2,"Ses Kanalı")
            .replace(4,"Kategori")
            .replace(5,"Duyuru Kanalı")
            .replace(11,"Herkese Açık Alt Başlık Kanalı")
            .replace(13,"Sahne Kanalı")
            .replace(14,"Rehber Kanalı")
            .replace(15,"Forum Kanalı")
          }`
            , inline: true },
            { name: "Kanal ID", value: `${newChannel.id}`, inline: true },
            { name: "Olusturulma Tarihi", value: `<t:${parseInt(newChannel.createdTimestamp / 1000)}:R>`, inline: true },
            { name:"NSFW",value:`${newChannel.nsfw ? "✅ Açık" : "❌ Kapalı"}`,inline:true},
          ])

          .addFields([
            { name: "Yeni Kanal Adı", value: `${newChannel.name}`, inline: false },
            { name: "Yeni Kanal Tipi", value: `${String(newChannel.type)
            .replace(0,"Yazı Kanalı")
            .replace(2,"Ses Kanalı")
            .replace(4,"Kategori")
            .replace(5,"Duyuru Kanalı")
            .replace(11,"Herkese Açık Alt Başlık Kanalı")
            .replace(13,"Sahne Kanalı")
            .replace(14,"Rehber Kanalı")
            .replace(15,"Forum Kanalı")
          }`
            , inline: true },
            { name: "Güncellenme Tarihi", value: `<t:${parseInt(new Date() / 1000)}:R>`, inline: true },
            { name:"NSFW",value:`${newChannel.nsfw ? "✅ Açık" : "❌ Kapalı"}`,inline:true},
          ])

          .setColor("Orange")
          .setFooter({text:`${oldChannel.guild.name}`})
          .setTimestamp()

          logs.send({ embeds: [response]})

    })

}