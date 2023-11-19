import { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js"
import database from "../utils/database/guilds_Schema.js"

const { default: CONFİG } = await import("../utils/bot/config.json", {
    assert: {
      type: "json",
    },
  });


export default client => {

    client.on("guildCreate", async guild => {

        const channelAdd = client.channels.cache.get(CONFİG.LOG.GUILD_CREATE)
        const owner = await client.users.fetch(guild.ownerId)
      
        const guildAddembed = new EmbedBuilder()
        .setTitle("New Server")
        .setColor("Green")
        .setThumbnail(client.user.avatarURL({ dynamic: true }))
        .setDescription("A new server has joined us. with the following features.")
        .addFields([
          {name: `Server name`, value: `${guild.name}`},
          {name: `Server ID`, value: `${guild.id}`},
          {name: `Server owner`, value: `${owner.tag}`},
          {name: `Server owner ID`, value: `${owner.id}`},
          {name: `Server member count`, value: `${guild.memberCount}`}
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
        .setDescription(`Thank you for adding me to your server!
        Please make sure to read our privacy policy before using our bot.
        Please note that multi-language support is only available to individual users and not to the server as a whole.`)
        .setThumbnail(owner.avatarURL({ dynamic: true }))

        owner.send({ embeds: [embed], components: [row1]})

    })

}