import { EmbedBuilder, PermissionsBitField } from "discord.js"
import { t } from "i18next"
import guilds_Schema from "../../utils/database/guilds_Schema.js"

export const data = {
    name: "autorole-setting",
    description: "Sets the automatic role system",

    async execute(interaction) {

        if(!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator))
        return interaction.reply({ content: t("missing_permissions", {ns: "common", lng: interaction.locale}) })

        let SubCmd = interaction.options.getSubcommand()
        let autoRole = interaction.options.getRole("role")

        switch(SubCmd){
            case "set": {
                
                await guilds_Schema.findOneAndUpdate({ guild_id: interaction.guild.id }, { $set: { autorole_id: autoRole.id, autorolesystem: true }}, { upsert: true })
                .then(() => {
                    interaction.reply({ content: t("autorole.set_succes", {lng: interaction.locale}) })
                }).catch(err => { 
                    interaction.reply({ content: t("Unexpected_error", {ns: "common", lng: interaction.locale}) })
                    console.log(err)
                })
                break
            }
            case "reset": {

                const { autorolesystem } = await guilds_Schema.findOne({ guild_id: interaction.guild.id }) || { autorolesystem: false }
                if(!autorolesystem) return interaction.reply({ content: "sistem kapalı durumda" })

                await guilds_Schema.findOneAndUpdate({ guild_id: interaction.guild.id}, { $set: { autorolesystem: false, autorole_id: null}}, { upsert: true} )
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
          name:"set",description:"make an installation",type:1,options:[
            {
                name:"role",
                description:"Please specify the role to be assigned to users",
                type:8,
                required:true
            }
          ]
        },
        {
            name:"reset",
            description:"Turns off the automatic role system",
            type:1
        }
        
    ]
}