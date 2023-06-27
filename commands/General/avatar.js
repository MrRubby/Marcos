import { EmbedBuilder } from "discord.js"
import { SlashCommandBuilder } from "@discordjs/builders"

export const data = {
    name: "avatar",
    description: "Kullanıcının avatarını döndürür",
    cooldown: 10,

    execute(interaction) {

       const target = interaction.options._hoistedOptions?.[0]?.member || interaction.member
       const avatar = target.displayAvatarURL({ dynamic: true, size: 512 })

       const response = new EmbedBuilder()
       .setTitle(`${target.displayName} Adlı kullanıcının avatarı`)
       .setDescription(`Avatarı tarayıcıda açmak için [Tıklayın](${avatar})`)
       .setColor("#f0f0f0")
       .setImage(avatar)

       interaction.reply({ embeds: [response] })

    }
}

export const slash_data = {
    name: data.name,
    description: data.description,
    options: [
        {
            name: "kullanıcı",
            description: "Lütfen kullanıcı belirtin",
            type: 6
        }
    ]
}