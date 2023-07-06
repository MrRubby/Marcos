import { EmbedBuilder, PermissionsBitField } from "discord.js"
import { t } from "i18next"

export const data = {
    name: "purge",
    description: "Deletes messages",

    execute(interaction) {

        const { channel } = interaction

        if(!interaction.member.permissions.has(PermissionsBitField.Flags.ManageChannels))
        return interaction.reply({ content: t("missing_permissions", {ns: "common", lng: interaction.locale}) })

        const deleteNumber = interaction.options.getInteger("amount")

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
            name: "amount",
            description: "Specify the quantity",
            type: 4,
            required: true,
            min_value: 1,
            max_value: 100,
        }
    ]
}