import cooldown_control from "../utils/cooldown_control.js"
import auto_complete from "../utils/events-utils/auto-complete.js"
import { EmbedBuilder } from "discord.js"
import { t } from "i18next"


export default client => {

    const { Embed } = client

    client.on("interactionCreate", interaction => {

        if (interaction.isAutocomplete()) auto_complete(interaction)
        if (!interaction.isCommand() && isContextMenuCommand()) return

        const command = client.commands.get(interaction.commandName)
        
        if (!command) return

        // Cooldown Control
        const cooldowm = cooldown_control(command, interaction.user.id)
        if (cooldowm) return interaction.reply(t("cooldown_error", {ns: "common", lng: interaction.locale, cooldown: cooldowm}))

        try {

            command.data.execute(interaction)

        } catch(e) {

            interaction.reply(t("Unexpected_error", {ns: "common", lng:interaction.locale}))
            console.log(e)

        }
    })

}