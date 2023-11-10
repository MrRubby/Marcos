import { EmbedBuilder } from "discord.js"
import database from "../utils/database/guilds_Schema.js"

const { default: CONFİG } = await import("../config.json", {
  assert: {
    type: "json",
  },
});

export default client => {

    client.on("guildDelete", async guild => {

        const channelDel = client.channels.cache.get(CONFİG.LOG.GUILD_DELETE)

        const dataDel = await database.findOne({ guild_id: guild.id}) || null;
        if(dataDel) return
        try{
          await database.deleteOne({ guild_id: guild.id })
        } catch (err) {
          console.log(err)
        }
        if(!guild.ownerId) return;
        const owner = await client.users.fetch(guild.ownerId)

        const guildDelembed = new EmbedBuilder()
        .setTitle("Old Server")
        .setColor("Red")
        .setThumbnail(client.user.avatarURL({ dynamic: true }))
        .setDescription("A server has stopped working. Details regarding the server can be found below.")
        .addFields([
            {name: `Server name`, value: `${guild.name}`},
            {name: `Server ID`, value: `${guild.id}`},
            {name: `Server owner`, value: `${owner.tag}`},
            {name: `Server owner ID`, value: `${owner.id}`},
            {name: `Server member count`, value: `${guild.memberCount}`}
        ])
        channelDel.send({embeds: [guildDelembed]})

    })

}