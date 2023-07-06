import { EmbedBuilder } from "discord.js"
import { SlashCommandBuilder } from "@discordjs/builders"

export const data = {
    name: "yardım",
    description: "yardm mesajı",

    execute(interaction) {

        const { commands } = interaction.client

        const commandName = interaction.options._hoistedOptions[0].value
        if (!commands.has(commandName)) return interaction.reply({ content: `\`${commandName}\` Adlı komut bulunamadı!`})
        const command = commands.get(commandName).data

        const response = new EmbedBuilder()
        .setColor("#f0f0f0")
        .addFields([
            { name: "Komut Adı", value: command.name, inline: true },
            { name: "Cooldown", value: `${command.cooldown || 5} saniye`, inline: true },
            { name: "Açıklama", value: command.description },
        ])

        interaction.reply({ embeds: [response] })
        
    }
}

export const slash_data = {
    name: data.name,
    description: data.description,
    options: [
        {
            name: "komut_adı",
            description: "Bilgi almak istediğiniz komutu belirtin",
            type: 3
        }
    ],
    autocomplete: true,
}