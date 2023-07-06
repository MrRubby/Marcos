import { EmbedBuilder } from "discord.js"
import { SlashCommandBuilder } from "@discordjs/builders"
import { t } from "i18next"

export const data = {
    name: "info",
    description: "Get information about the system status",

    execute(interaction) {


        const response = new EmbedBuilder()
        .setColor("#ffa954")
        .addFields(
            { name: `${t("info.information_title", {lng: interaction.locale})}`, value: `${t("info.information", {lng: interaction.locale})}`, inline: true},
        )

        interaction.reply({ embeds: [response]})
    }
}

export const slash_data = {
    name: data.name,
    description: data.description
}