import { EmbedBuilder, PermissionsBitField } from "discord.js"
import { t } from "i18next"

export const data = {
    name: "sil",
    description: "Mesajlarıı siler",

    execute(interaction) {

        const { channel } = interaction

        if(!interaction.member.permissions.has(PermissionsBitField.Flags.ManageChannels))
        return interaction.reply({ content: t("missing_permissions", {ns: "common", lng: interaction.locale}) })

        const deleteNumber = interaction.options.getInteger("miktar")

        channel.bulkDelete(deleteNumber, true)
        .then(messages => {
            return interaction.reply({ content: t("purge.succes", { lng: interaction.locale, messages: messages.size}), ephemeral: true})
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