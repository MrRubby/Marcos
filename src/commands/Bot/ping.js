import { EmbedBuilder } from "discord.js"
import { SlashCommandBuilder } from "@discordjs/builders"
import { t } from "i18next"

export const data = {
    name: "ping",
    description: "You display the delay values of the system",

    execute(interaction) {

        const start = Date.now();
        const end = Date.now();
        const { ws } = interaction.client

        interaction.reply(t("ping.reply_message", {lng: interaction.locale})).then(msg => {

            const embed = new EmbedBuilder()
            .setColor("Red")
            .setTitle(interaction.user.username + " - Pong!")
            .setThumbnail(interaction.user.displayAvatarURL())
            .addFields([
                { name: t("ping.message_speed", {lng: interaction.locale}), value: `\`${end - start}ms\` 🛰️` },
                { name: t("ping.message_response_speed", {lng: interaction.locale}), value: `\`${Date.now() - start}ms\` 🛰️` },
                { name: t("ping.apı_response_speed", {lng: interaction.locale}), value: `\`${Math.round(ws.ping)}ms\` 🛰️` }
            ])
            .setTimestamp()
            .setFooter({ text: `${interaction.client.user.username} ❤️` })
            interaction.editReply({ embeds: [embed] })

        })
    }
}

export const slash_data = {
    name: data.name,
    description: data.description
}