import { EmbedBuilder } from "discord.js"
import { SlashCommandBuilder } from "@discordjs/builders"
import { t } from "i18next"

export const data = {
    name: "ping",
    description: "deneme",
    cooldown: 10,

    execute(interaction) {

        const { ws } = interaction.client

        const discord_ping = ws.discord_ping
        const bot_ping  = Math.abs(Date.now() - interaction.createdTimestamp)

        const response = new EmbedBuilder()
        .setColor("#ffa954")
        .addFields(
            { name: `${t("ping.discord_latency", {lng: interaction.locale})}`, value: `${discord_ping} ms`, inline: true},
            { name: `${t("ping.bot_latency", {lng: interaction.locale})}`, value: `${bot_ping} ms`, inline: true},
        )

        interaction.reply({ embeds: [response]})
    }
}

export const slash_data = {
    name: data.name,
    description: data.description
}