import { EmbedBuilder, PermissionsBitField } from "discord.js"
import { t } from "i18next"
import database from "../../utils/database/guilds_Schema.js"

export const data = {
    name: "autorole-setting",
    description: "Make installation of the automatic role system",

    async execute(interaction) {

        if(!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator))
        return interaction.reply({ content: t("missing_permissions", {ns: "common", lng: interaction.locale}) })

        let SubCmd = interaction.options.getSubcommand()
        let autoRole = interaction.options.getRole("role")

        switch(SubCmd){
            case "set": {

                if(!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator))
                return interaction.reply({ content: t("bot_missing_permissions", {ns: "error", lng: interaction.locale}) })
                
                await database.findOneAndUpdate({ guild_id: interaction.guild.id }, { $set: { autorole_id: autoRole.id, autorolesystem: true }}, { upsert: true })
                .then(() => {
                    interaction.reply({ content: t("autorole.set_succes", {lng: interaction.locale}) })
                }).catch(err => { 
                    interaction.reply({ content: t("Unexpected_error", {ns: "common", lng: interaction.locale}) })
                    console.log(err)
                })
                break
            }
            case "reset": {

                const { autorolesystem } = await database.findOne({ guild_id: interaction.guild.id }) || { autorolesystem: false }
                if(!autorolesystem) return interaction.reply({ content: t("autorole.error", {lng: interaction.locale}) })

                await database.findOneAndUpdate({ guild_id: interaction.guild.id}, { $set: { autorolesystem: false, autorole_id: null}}, { upsert: true} )
                .then(() => {
                    interaction.reply({ content: t("autorole.res_succes", {lng: interaction.locale}) })
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
          name:"set",description:"You can set the automatic role system",type:1,options:[
            {
                name:"role",
                description:"Specify the role to be assigned to users",
                type:8,
                required:true
            },
            {
                name:"channel",
                description:"Specify the channel for automatic role log output",
                type:7,
                required:true,
                channel_types: [0]
            }
          ]
        },
        {
            name:"reset",
            description:"Switches off the automatic role system",
            type:1
        }
        
    ]
}