import { EmbedBuilder } from "discord.js"
import { t } from "i18next"

export const data = {
    name: "avatar",
    description: "Kullanıcının avatarını döndürür",
    cooldown: 10,

    execute(interaction) {

       const target = interaction.options._hoistedOptions?.[0]?.member || interaction.member
       const avatar = target.displayAvatarURL({ dynamic: true, size: 512 })

       const response = new EmbedBuilder()
       .setTitle(t("avatar.title", {lng: interaction.locale, target: target.displayName}))
       .setDescription(t("avatar.description", {lng: interaction.locale, avatar: avatar}))
       .setColor("#f0f0f0")
       .setImage(avatar)
       .setTimestamp()
       .setFooter({ text: `${interaction.client.user.username} ❤️` })
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