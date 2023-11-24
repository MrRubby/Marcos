import database from "../utils/database/guilds_Schema.js"
import { EmbedBuilder, PermissionsBitField } from "discord.js";
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const kfrKelimeler = require('../utils/Filters/kfr.json');
const linkler = require('../utils/Filters/lnks.json');

export default client => {

    client.once("messageUpdate", async (oldMessage, newMessage) => {

        if (oldMessage.author.bot) return;
        if(oldMessage.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) return;
        const { kfrEngel, lnkEngl, messagelog, kelimeEngl } = (await database.findOne({ guild_id: oldMessage.guild.id })) || { kelimeEngl: false, messagelog_id: null, kfrEngel: false, lnkEngl: false };
        if (!messagelog) return;
        const channel = oldMessage.guild.channels.cache.get(messagelog);
        if (!channel) return;
        try {

            const embed = new EmbedBuilder()
            .setAuthor({ name: oldMessage.member.user.tag, iconURL: oldMessage.member.user.avatarURL()})
            .setDescription(`**${oldMessage.member} tarafından gönderilen mesaj ${oldMessage.channel} kanalında güncellendi!** [Mesaja Git](${newMessage.url})`)
            .addFields(
                { name: "Eski Mesaj", value: `\`\`\`${oldMessage.content}\`\`\``, inline: false },
                { name: "Yeni Mesaj", value: `\`\`\`${newMessage.content}\`\`\``, inline: false }
            )
            .setColor("#2ACAEA")
            .setFooter({ text: `${oldMessage.guild.name}` })
            .setTimestamp()
            channel.send({ embeds:  [embed] })

        } catch(err) {
            console.log(err)
        }
        if (kfrEngel) {
            let blacklist = kfrKelimeler;
            let foundInText = false;
            for (var i in blacklist) {
              if (newMessage.content.toLowerCase().includes(blacklist[i].toLowerCase()))
                foundInText = true;
            }
            if (foundInText) {
              newMessage.delete()
              const kfrEmbed = new EmbedBuilder()
              .setDescription(`Hey! ${newMessage.author}, beni kandırmaya mı çalışıyorsun? Ben sunucuda küfürlere izin vermiyorum`)
              newMessage.channel.send({ embeds: [kfrEmbed] })
              return;
            }
        }
        if (lnkEngl) {
            let blacklist = linkler;
            let foundInText = false;
            for (var i in blacklist) {
              if (newMessage.content.toLowerCase().includes(blacklist[i].toLowerCase()))
                foundInText = true;
            }
            if (foundInText) {
              newMessage.delete();
              const lnkEmbed = new EmbedBuilder()
              .setDescription(`Hey! ${newMessage.author}, beni kandıramazsın dostum! Ben bu sunucuda link paylaşmana izin vermem`)
              newMessage.channel.send({ embeds: [lnkEmbed] })
              return;
            }
        }
        if (kelimeEngl) {
            const {yskKelime} = await database.findOne({ guild_id: message.guild.id }) || {yskKelime:null};
            if(!yskKelime) return;
            let blacklist = yskKelime;
            let foundInText = false;
            for (var i in blacklist) {
              if (message.content.toLowerCase().includes(blacklist[i].toLowerCase()))
                foundInText = true;
            }
            if (foundInText) {
              message.delete();
              const klmEmbed = new EmbedBuilder()
              .setDescription(`Hey! ${message.author}, bu kelime bu sunucda yasaklanmış!`)
              newMessage.channel.send({ embeds: [klmEmbed] })
              return;
            }
        }
    })
}