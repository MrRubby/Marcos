import { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js"
import { t } from "i18next"
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const CONFİG = require('../../utils/bot/config.json');

export const data = {
    name: "help",
    description: "Do you need help?",

    execute(interaction) {

        const prefix = CONFİG.BOT.PREFIX

        const response = new EmbedBuilder()
        .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL()})
        .setThumbnail(interaction.client.user.displayAvatarURL())
        .setColor("Purple")
        .setDescription(t("info.information_desc", {lng: interaction.locale, prefix: prefix}) )
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
            .setLabel("Invite Me")
            .setStyle(ButtonStyle.Link)
            .setURL(CONFİG.BOT.INVATE_LINK),
            new ButtonBuilder()
            .setLabel("Support Server")
            .setStyle(ButtonStyle.Link)
            .setURL(CONFİG.BOT.SUPPORT_SERVER),
            new ButtonBuilder()
            .setLabel("Vote Me")
            .setStyle(ButtonStyle.Link)
            .setURL(CONFİG.BOT.VOTE_LINK)
        )

        interaction.reply({ embeds: [response], components: [row1]})

    }
}

export const slash_data = {
    name: data.name,
    description: data.description
}