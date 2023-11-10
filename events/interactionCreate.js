import cooldown_control from "../utils/bot/cooldown_control.js"
import { EmbedBuilder } from "discord.js"
import { t } from "i18next"

export default client => {
    const { embed } = client
    client.on("interactionCreate", interaction => {

        if (!interaction.isCommand() && interaction.isChannelSelectMenu() && interaction.isModalSubmit()) return

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