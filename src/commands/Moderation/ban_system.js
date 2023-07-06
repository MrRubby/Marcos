import { EmbedBuilder, PermissionsBitField } from "discord.js"
import { t } from "i18next"
import guilds_Schema from "../../utils/database/guilds_Schema.js"

export const data = {
    name: "ban-setting",
    description: "Sets the ban system",

    async execute(interaction) {

        if(!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator))
        return interaction.reply({ content: t("missing_permissions", {ns: "common", lng: interaction.locale}) })

        let SubCmd = interaction.options.getSubcommand()

        switch(SubCmd){
            case "set": {
                let rol = interaction.options.getRole("role");
                const { banrole_id, bansystem } = await guilds_Schema.findOne({ guild_id: interaction.guild.id }) || { banrole_id: null };
                await guilds_Schema.findOneAndUpdate({ guild_id: interaction.guild.id }, { $set: { banrole_id: rol.id, bansystem: true } }, { upsert: true })
                .then(() => {
                    interaction.reply({ content: t("bansystem.set_succes", {lng: interaction.locale}) })
                }).catch(err => { 
                    interaction.reply({ content: t("Unexpected_error", {ns: "common", lng: interaction.locale}) })
                    console.log(err)
                })
                break
            }
            case "reset": {
                const { bansystem } = await guilds_Schema.findOne({ guild_id: interaction.guild.id }) || { bansystem: false };
                if (!bansystem) return interaction.reply({ content: t("bansystem.error", {lng: interaction.locale}) });
                await guilds_Schema.findOneAndUpdate({ guild_id: interaction.guild.id }, { $set: { bansystem: false, banrole_id: null } }, { upsert: true })
                .then(() => {
                    interaction.reply({ content: t("bansystem.res_succes", {lng: interaction.locale}) })
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
          name:"set",description:"make an installation",type:1,options:[
            {
                name:"role",
                description:"The Role of the Ban Parent",
                type:8,
                required:true
            }
          ]
        },
        {
            name:"reset",
            description:"Closes the ban system",
            type:1
        }
        
    ]
}