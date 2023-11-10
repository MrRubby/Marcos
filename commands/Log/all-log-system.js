import { EmbedBuilder, PermissionsBitField } from "discord.js";
import { t } from "i18next"
import database from "../../utils/database/guilds_Schema.js"

export const data = {
    name: "log-system",
    description: "Log setting",

    async execute(interaction) {

        if(!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator))
        return interaction.reply({ content: t("missing_permissions", {ns: "common", lng: interaction.locale}) })

        let SubCmd = interaction.options.getSubCommand()

        switch(SubCmd){
            case "channel": {

                let SubCmda = interaction.options.getSubCommand()

                switch(SubCmda){

                    case "set": {

                        let channel = interaction.options.getChannel("channel")
                        await database.findOne({ guild_id: interaction.guild.id}, {$set: {channellog_id: channel.id }}, {upsert: true})
                        .then(() => {
                            interaction.reply({ content: t("bansystem.set_succes", {lng: interaction.locale}) })
                        }).catch(err => { 
                            interaction.reply({ content: t("Unexpected_error", {ns: "common", lng: interaction.locale}) })
                            console.log(err)
                        })
                        break
                    }

                    case "reset": {

                    }
                }

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
            name: "channel",
            description: "channel log setting",
            type: 1,
            options:[
                {
                    name: "set",
                    description: "channel set",
                    type: 1,
                    options: [
                        {
                            name: "channel",
                            description: "kanal belirle",
                            type: 7
                        }
                    ]
                },
                {
                    name: "reset",
                    description: "sıfırla",
                    type: 1
                }
            ]
        }
    ]
}