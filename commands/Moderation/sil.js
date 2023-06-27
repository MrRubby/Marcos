import { EmbedBuilder, PermissionsBitField } from "discord.js"

export const data = {
    name: "sil",
    description: "Mesajlarıı siler",

    execute(interaction) {

        const { channel } = interaction

        if(!interaction.member.permissions.has(PermissionsBitField.Flags.ManageChannels))
        return interaction.reply({ content: "Yetersiz yetki"})

        const deleteNumber = interaction.options.getInteger("miktar")

        channel.bulkDelete(deleteNumber, true)
        .then(messages => {
            return interaction.reply({ content: `${messages.size} Adet mesaj silindi`, ephemeral: true})
        })
    }
}

export const slash_data = {
    name: data.name,
    description: data.description,
    options: [
        {
            name: "miktar",
            description: "Miktar belirtin",
            type: 4,
            required: true,
            min_value: 1,
            max_value: 100,
        }
    ]
}