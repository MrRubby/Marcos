import { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js"
import { t } from "i18next"

export const data = {
    name: "info",
    description: "Do you need help?",

    execute(interaction) {

        const response = new EmbedBuilder()
        .setTitle(`${t("info.information_title", {lng: interaction.locale})} ${interaction.guild.name}`)
        .setDescription(t("info.information_desc", {lng: interaction.locale}) )
        .addFields([
            { name: 
                t("info.fields_name", {lng: interaction.locale}), value: `[${t("info.fields_value", {lng: interaction.locale})}](https://mrrubby.github.io/marco/commands/index.html)
                [${t("info.fields_value1", {lng: interaction.locale})}](https://mrrubby.github.io/marco/privacy/index.html)
                [${t("info.fields_value2", {lng: interaction.locale})}](https://mrrubby.github.io/marco/termsofservice/index.html)`
            }
        ])

        const row1 = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setLabel("Invite Marco'S")
            .setStyle(ButtonStyle.Link)
            .setURL("https://discord.com/oauth2/authorize?client_id=580189198250803201&permissions=8&scope=applications.commands%20bot")
        )

        interaction.reply({ embeds: [response], components: [row1]})

    }
}

export const slash_data = {
    name: data.name,
    description: data.description
}