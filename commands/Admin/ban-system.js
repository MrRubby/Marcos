import { EmbedBuilder, PermissionsBitField } from "discord.js"
import { t } from "i18next"
import database from "../../utils/database/guilds_Schema.js"

export const data = {
    name: "ban-setting",
    description: "Make installation of the prohibition system",

    async execute(interaction) {

        if(!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator))
        return interaction.reply({ content: t("missing_permissions", {ns: "common", lng: interaction.locale}) })

        let SubCmd = interaction.options.getSubcommand()

        switch(SubCmd){
            case "set": {
                let rol = interaction.options.getRole("role");
                if (!interaction.guild.members.me.roles.highest.position < rol.position)
                return interaction.reply({ content: t("botrole_position_error", { ns: "error", lng: interaction.locale}), ephemeral: true })
                await database.findOneAndUpdate({ guild_id: interaction.guild.id }, { $set: { banrole_id: rol.id, bansystem: true } }, { upsert: true })
                .then(() => {
                    interaction.reply({ content: t("bansystem.set_succes", {lng: interaction.locale}) })
                }).catch(err => { 
                    interaction.reply({ content: t("Unexpected_error", {ns: "common", lng: interaction.locale}) })
                    console.log(err)
                })
                break
            }
            case "reset": {
                const { bansystem } = await database.findOne({ guild_id: interaction.guild.id }) || { bansystem: false };
                if (!bansystem) return interaction.reply({ content: t("bansystem.error", {lng: interaction.locale}) });
                await database.findOneAndUpdate({ guild_id: interaction.guild.id }, { $set: { bansystem: false, banrole_id: null } }, { upsert: true })
                .then(() => {
                    interaction.reply({ content: t("bansystem.reset_succes", {lng: interaction.locale}) })
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
          name:"set",description:"You can set the prohibition system",type:1,options:[
            {
                name:"role",
                description:"Specify the authorised role that can use the system",
                type:8,
                required:true
            }
          ]
        },
        {
            name:"reset",
            description:"Switches off the banning system",
            type:1
        }
        
    ]
}