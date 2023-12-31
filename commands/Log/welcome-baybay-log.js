import { EmbedBuilder, PermissionsBitField, ChannelSelectMenuBuilder, ChannelType, ActionRowBuilder, ComponentType } from "discord.js"
import { t } from "i18next"
import database from "../../utils/database/guilds_Schema.js"

export const data = {
    name: "incoming-outgoinglog",
    description: "Sets the Incoming-Outgoing log channel",

    async execute(interaction) {

        let channel = interaction.options.getChannel("channel")
        if(!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator))
        return interaction.reply({ content: t("missing_permissions", {ns: "common", lng: interaction.locale}) })

        let SubCmd = interaction.options.getSubcommand()

        switch(SubCmd) {
            case "set" : {
                await database.updateOne({ guild_id: interaction.guild.id}, {welcomelog_id: channel.id}, {upsert: true})
                interaction.reply(t("welbylog.set_succes", {lng: interaction.locale}))
                const setEmbed = new EmbedBuilder()
                .setDescription(t("welbylog.set_embed", {lng: interaction.locale}))
                channel.send({ embeds: [setEmbed] })
                break
            }
            case "reset" : {
                await database.updateOne({ guild_id: interaction.guild.id}, {welcomelog_id: null}, {upsert: true})
                interaction.reply({ content: t("welbylog.res_succes", {lng: interaction.locale})})
                break
            }
        }
    }
}

export const slash_data = {
    name: data.name,
    description: data.description,
    options: [
        {
            name: "set",
            description: "make a setup",
            type: 1,
            options: [
                {
                    name: "channel",
                    description: "identify the channel",
                    type: 7,
                    required: true

                }
            ]
        },
        {
            name: "reset",
            description: "Resets the log system",
            type: 1
        }
    ]
}