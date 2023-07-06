import { EmbedBuilder, PermissionsBitField } from "discord.js"
import { t } from "i18next"
import guilds_Schema from "../../utils/database/guilds_Schema.js"

export const data = {
    name: "registry-status",
    description: "Determines the status of the recording system",


    async execute(interaction) {

        if(!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator))
        return interaction.reply({ content: t("missing_permissions", {ns: "common", lng: interaction.locale}) })

        let SubCmd = interaction.options.getSubCommand()

        switch(SubCmd){
            case "open": {
                const { registersystem } = await guilds_Schema.findOne({ guild_id: interaction.guild.id})
                await guilds_Schema.findOneAndUpdate({ guild_id: interaction.guild.id}, { $set: { registersystem: true } }, { upsert: true})
                .then(() => {
                    interaction.reply({ content: t("registstatus.set_succes", {lng: interaction.locale}) })
                })
                break
            }
            case "close": {
                const { registersystem } = await guilds_Schema.findOne({ guild_id: interaction.guild.id }) || { registersystem: false }
                if(!registersystem) return interaction.reply({ content: t("registstatus.error", {lng: interaction.locale}) })
                await guilds_Schema.findOneAndUpdate({ guild_id: interaction.guild.id}, { $set: { registersystem: false, adminrole_id: null, userrole_id: null, registerlog_id: null} }, { upsert: true})
                .then(() => {
                    interaction.reply({ content: t("registstatus.res_succes", {lng: interaction.locale}) })
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
          name: "open",
          description: "Opens the system",
          type: 1,
        },
        {
            name: "close",
            description: "Shuts down the system",
            type: 1,
        }
        
    ]
}