import cooldown_control from "../utils/bot/cooldown_control.js"
import { EmbedBuilder } from "discord.js"
import { t } from "i18next"

import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const CONFİG = require('../utils/bot/config.json');

export default client => {
    const { embed } = client
    client.on("interactionCreate",async interaction => {

        if (interaction.user.id !== "564545098017407007" && "564545098017407007") {
            return interaction.reply({ content: "Only the developer team can use the commands in the demo system.", ephemeral: true})
        }

        if (!interaction.isCommand() && interaction.isChannelSelectMenu() && interaction.isModalSubmit()) return

        if (interaction.customId === "bugreport"){

            const command = interaction.fields.getTextInputValue("command")
            const description = interaction.fields.getTextInputValue("description")
            const id = interaction.user.id
            const member = interaction.member
            const server = interaction.guild.id || "No server provided"

            const channel = await interaction.client.channels.cache.get(CONFİG.LOG.REPORT)

            const reportEmbed = new EmbedBuilder()
            .setTitle(`Report from ${member}`)
            .setFields(
                { name: "User ID", value: `${id}`},
                { name: "Member", value: `${member}`},
                { name: "Server ID", value: `${server}`},
                { name: "Command Reported", value: `${command}`},
                { name: "Reported Description", value: `${description}`}
            )
            .setTimestamp()
            .setFooter({ text: `Report Bug System`})

            await channel.send({ embeds: [reportEmbed]}).catch(err => {})
            await interaction.reply({ content: `Your report has been submited`, ephemeral: true })

        }

        const command = client.commands.get(interaction.commandName)

        if (!command) return

        // Cooldown Control (Bekleme Süresi Kontrolü)
        const cooldown = cooldown_control(command, interaction.user.id)
        if (cooldown) return interaction.reply(t("cooldown_error", {ns: "common", lng: interaction.locale, cooldown: cooldown}))
        try {
            command.data.execute(interaction)
        } catch(e) {
            interaction.reply(t("unexpected_error", {ns: "common", lng: interaction.guild.locale}))
            // If an error is encountered during execution, the system will inform the user of the issue and present the error specifics on the console.
            // Yürütme sırasında bir hatayla karşılaşılırsa, sistem kullanıcıyı sorun hakkında bilgilendirecek ve hata ayrıntılarını konsolda sunacaktır.
            console.log(e)
        }
    })
}