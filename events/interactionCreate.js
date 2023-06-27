import cooldown_control from "../utils/cooldown_control.js"
import auto_complete from "../utils/events-utils/auto-complete.js"


export default client => {

    const { Embed } = client

    client.on("interactionCreate", interaction => {

        if (interaction.isAutocomplete()) auto_complete(interaction)
        if (!interaction.isCommand() && isContextMenuCommand()) return

        const command = client.commands.get(interaction.commandName)
        
        if (!command) return

        // Cooldown Control
        const cooldowm = cooldown_control(command, interaction.member.id)
        if (cooldowm) return interaction.reply({ content: `Bu komutu \`${cooldowm}\` saniye sonra tekrar kullanabilirsin`})

        try {

            command.data.execute(interaction)

        } catch(e) {

            interaction.reply({ content: "Bu komutu kullanırken bir hata oluştu. Geliştirici ekibine durumu bildirebilirsin"})
            console.log(e)

        }

    })

}