import cooldown_control from "../utils/cooldown_control.js"
import { t } from "i18next"

export default client => {

    const prefix = process.env.prefix
    
    client.on("messageCreate", message => {
        
        if(message.content.startsWith(prefix) == false) return
        const args = message.content.slice(1).trim().split(/ +/)
        const commandName = args.shift().toLowerCase()

        const command = client.commands.get(commandName)
        if(!command) return

        // Permission Control
        if(command.permission && !message.member.permissions.has(command.permission))
        return message.reply(`Bu komutu kullanabilmek için \`${command.permission}\` yetkisine sahip olman gerekiyor.`)

        // CoolDown Control
        const cooldowm = cooldown_control(command, message.member.id)
        if(cooldowm) return message.reply(t("cooldown_error", {ns: "common", lng: interaction.locale, cooldowm: cooldowm}))

        try {
            command.execute(message)
        } catch (e) {
            console.error(e)
            message.reply(t("Unexpected_error", {ns: "common", lng:interaction.locale}))
        }

        if (message.content == "ping") {
            message.reply("Pong!")
        }
    })
}