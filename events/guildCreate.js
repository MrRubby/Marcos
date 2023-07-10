import { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js"
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

        const row1 = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setLabel("Invite Me")
            .setStyle(ButtonStyle.Link)
            .setURL("https://discord.com/oauth2/authorize?client_id=580189198250803201&permissions=8&scope=applications.commands%20bot"),
             new ButtonBuilder()
             .setLabel("Vote Me")
             .setStyle(ButtonStyle.Link)
             .setURL("https://top.gg/bot/580189198250803201"),
             new ButtonBuilder()
             .setLabel("Privacy Policy")
             .setStyle(ButtonStyle.Link)
             .setURL("https://mrrubby.github.io/marco/privacy/index.html")
        )

        const embed = new EmbedBuilder()
        .setTitle(guild.name)
        .setDescription(`Thank you for adding me to  your server!
        - Don't forget to read our privacy policy before using our bot!
        - Multi-language support is supported on a user-based basis, not on a server-based basis.`)
        .setThumbnail(owner.avatarURL({ dynamic: true }))

        owner.send({ embeds: [embed], components: [row1]})

    })

}