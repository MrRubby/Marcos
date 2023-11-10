import { EmbedBuilder } from "discord.js";
import { t } from "i18next"

export default (client, interaction) => {

    const pingEmbed = new EmbedBuilder()
    .setColor("Red")
    .setTitle(interaction.user.username + " - Pong!")
    .setThumbnail(interaction.user.displayAvatarURL())
    .addFields([
        { name: t("ping.message_speed", {lng: interaction.locale}), value: ` 🛰️` },
        { name: t("ping.message_response_speed", {lng: interaction.locale}), value: ` 🛰️` },
        { name: t("ping.apı_response_speed", {lng: interaction.locale}), value: ` 🛰️` }
    ])
    .setTimestamp()
    .setFooter({ text: `${interaction.client.user.username} ❤️` })

    return { pingEmbed}

}
