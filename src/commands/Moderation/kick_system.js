import { EmbedBuilder, PermissionsBitField } from "discord.js"
import { t } from "i18next"
import guilds_Schema from "../../utils/database/guilds_Schema.js"

export const data = {
    name: "kick-setting",
    description: "Get information about the system status",

    async execute(interaction) {

        if(!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator))
        return interaction.reply({ content: t("missing_permissions", {ns: "common", lng: interaction.locale}) })
        
        let SubCmd = interaction.options.getSubcommand()

        switch(SubCmd){
            case "set": {
                let rol = interaction.options.getRole("role");
                await guilds_Schema.findOneAndUpdate({ guild_id: interaction.guild.id }, { $set: { kickrole_id: rol.id, kicksystem: true } }, { upsert: true })
                .then(() => {
                    interaction.reply({ content: t("kicksystem.set_succes", {lng: interaction.locale}) })
                }).catch(err => { 
                    interaction.reply({ content: t("Unexpected_error", {ns: "common", lng: interaction.locale}) })
                    console.log(err)
                })
                break
            }
            case "reset": {
                const { kicksystem } = await guilds_Schema.findOne({ guild_id: interaction.guild.id }) || { kicksystem: false };
                if (!kicksystem) return interaction.reply({ content: t("kicksystem.error", {lng: interaction.locale}) });

                await guilds_Schema.findOneAndUpdate({ guild_id: interaction.guild.id }, { $set: { kicksystem:false, kickrole_id: null } }, { upsert: true })
                .then(() => {
                    interaction.reply({ content: t("kicksystem.res_succes", {lng: interaction.locale}) })
                }).catch(err => { 
                    interaction.reply({ content: t("Unexpected_error", {ns: "common", lng: interaction.locale}) })
                    console.log(err)
                })
                break
            }
        } 

    }
}

export const slash_data = {
    name: data.name,
    description: data.description,
    type: 1,
    options:[
        {
          name:"set",description:"kick sistemi ayarlar",type:1,options:[
            {
                name:"role",
                description:"Ban Yetilisi Rolü (UNUTMA! Bu role sahip kişiler üyeleri yasakla yetkisine sahip olucak!)",
                type:8,
                required:true
            }
          ]
        },
        {
            name:"reset",
            description:"Ban sistemi sıfırlar",
            type:1
        }
        
    ]
}