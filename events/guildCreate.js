import { EmbedBuilder } from "discord.js"
import guilds_Schema from "../utils/database/guilds_Schema.js"

export default client => {

    client.on("guildCreate", async guild => {

        const channelAdd = client.channels.cache.get("1121447101134557205")
        const owner = await client.users.fetch(guild.ownerId)
      
        const guildAddembed = new EmbedBuilder()
        .setTitle("Yeni Sunucu")
        .setThumbnail(client.user.avatarURL({ dynamic: true }))
        .setDescription("Aramıza yeni bir sunucu katıldı. Sunucuya ait özellikler aşağıda bulunmaktadır.")
        .addFields([
          {name: `Sunucu adı`, value: `${guild.name}`},
          {name: `Sunucu kimliği`, value: `${guild.id}`},
          {name: `Sunucu sahibi`, value: `${owner.tag}`},
          {name: `Sunucu sahibi kimliği`, value: `${owner.id}`},
          {name: `Sunucu üye sayısı`, value: `${guild.memberCount}`}
        ])
        channelAdd.send({embeds: [guildAddembed]}) 

    })

}