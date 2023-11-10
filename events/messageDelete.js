import database from "../utils/database/guilds_Schema.js"
import { EmbedBuilder } from "discord.js";

export default client => {

  client.on("messageDelete", async message => {

    if(message.author.bot) return;
    const { messagelog } = await database.findOne({ guild_id: message.guildId }) || { messagelog_id: null };
    if (!messagelog) return;
    if(message.channelId == messagelog) return;
    const channel = message.guild.channels.cache.get(messagelog);
    try{

      const embed = new EmbedBuilder()
      .setAuthor({name:message.member.user.tag,iconURL: message.member.user.avatarURL()})
      .setDescription(`**${message.member} tarafından gönderilen mesaj ${message.channel} kanalında silindi!**`)
      .addFields({name:"Mesaj içeriği",value:`\`\`\`${message.content}\`\`\``,inline:false})
      .setColor("#2ACAEA")
      .setFooter({text:`${message.guild.name}`})
      .setTimestamp()
      channel.send({ embeds:  [embed] })

    } catch(err) {

      console.log(err)

    }

  })
}
