import database from "../utils/database/guilds_Schema.js"
import { PermissionsBitField } from "discord.js"
import { t } from "i18next"

const { default: kfrKelimeler } = await import("../utils/Filters/kfr.json", {
    assert: {
      type: "json",
    },
  });

  const { default: linkler } = await import("../utils/Filters/lnks.json", {
    assert: {
      type: "json",
    },
  });

export default client => {

    client.on("messageCreate", async message => {

        if (message.author.bot) return;
        if(message.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) return; 

        const db = await database.findOne({ guild_id: message.guild.id })
        const kfrEngel = db.kfrEngel || false
        const kelimeEngl = db.kelimeEngl || false
        const lnkEngel = db.lnkEngl || false
        const bKlm = db.bKlm || null

        if(kfrEngel){
            let blacklist = kfrKelimeler;
            let foundInText = false;
            for (var i in blacklist) {
                if (message.content.toLowerCase().includes(blacklist[i].toLowerCase())) foundInText = true;
            }
            if (foundInText) {
                await message.delete();
                setTimeout(async => {
                    message.channel.send({embeds:[{
                    description:`Hey! ${message.author}, ben varken küfür etmene izin vermem!`}]}).then((msg) => {
                        setTimeout(async () => {
                            await msg.delete()
                        }, 500);
                    })
                }, 500);
                return;
            }
        }
        if(lnkEngel){
            let blacklist = linkler;
            let foundInText = false;
            for (var i in blacklist) {
                if (message.content.toLowerCase().includes(blacklist[i].toLowerCase())) foundInText = true;
            }
            if (foundInText) {
                message.delete();
                setTimeout(async => {
                    message.channel.send({embeds:[{
                    description:`Hey! ${message.author}, ben varken sunuda reklam yapmana izin vermem!`}]}).then((msg) => {
                        setTimeout(async () => {
                            await msg.delete()
                        }, 500);
                    })
                }, 500);
                return;
            }
        }
        if(kelimeEngl){
                
            let blacklist = bKlm;
            let foundInText = false;
            for (var i in blacklist) {
                if (message.content.toLowerCase().includes(blacklist[i].toLowerCase())) foundInText = true;
            }
            if (foundInText) {
                
                message.delete();
                setTimeout(async => {
                    message.channel.send({embeds:[{
                    description:`Hey! ${message.author}, bu kelime bu sunucda yasaklanmış!`}]}).then((msg) => {
                        setTimeout(async () => {
                            await msg.delete()
                        }, 500);
                    })
                }, 500);
                return;
            }
        }
    })

}