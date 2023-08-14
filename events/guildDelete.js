import { EmbedBuilder } from "discord.js"
import guilds_Schema from "../utils/database/guilds_Schema.js"

export default client => {

    client.on("guildDelete", async guild => {

        const channelDel = client.channels.cache.get("1121447101134557205")

        const dataDel = await guilds_Schema.findOne({ guild_id: guild.id}) || null;
        if(dataDel) return
        try{
          await guilds_Schema.deleteOne({ guild_id: guild.id })
        } catch (err) {
          console.log(err)
        }
        if(!guild.ownerId) return;
        const owner = await client.users.fetch(guild.ownerId)

        const guildDelembed = new EmbedBuilder()
        .setTitle("Eski Sunucu")
        .setThumbnail(client.user.avatarURL({ dynamic: true }))
        .setDescription("Bir sunucu aramızdan ayrıldı. Sunucuya ait bilgiler aşağıda bulunmaktadır")
        .addFields([
            {name: `Sunucu adı`, value: `${guild.name}`},
            {name: `Sunucu kimliği`, value: `${guild.id}`},
            {name: `Sunucu sahibi`, value: `${owner.tag}`},
            {name: `Sunucu sahibi kimliği`, value: `${owner.id}`},
            {name: `Sunucu üye sayısı`, value: `${guild.memberCount}`}
        ])
        channelDel.send({embeds: [guildDelembed]})

    })

}