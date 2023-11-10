

import { EmbedBuilder, ActionRowBuilder, PermissionsBitField, ModalBuilder, TextInputBuilder, TextInputStyle, StringSelectMenuBuilder } from "discord.js"
import { t } from "i18next"
import database from "../../utils/database/guilds_Schema.js"

export const data = {
    name: "log-settings",
    description: "Make installation of the log system",


    async execute(interaction) {

        const embed = new EmbedBuilder()
        .setAuthor({ name: interaction.guild.name, iconURL: interaction.client.user.displayAvatarURL() })
        .setDescription("Lütfen yapmak istediğiniz işlemi aşağıdan seçiniz.")
        .setColor("Purple")

        const row = new ActionRowBuilder()
        .addComponents(
            new StringSelectMenuBuilder()
            .setCustomId("test")
            .setPlaceholder(t("deneme.selectdeneme", { lng: interaction.locale }))
            .addOptions([
                { label: "test", value: "testvalue", description: "testdescription" },
                { label: "test2", value: "testvalue2", description: "testdescription2" },
                { label: "test3", value: "testvalue3", description: "testdescription3" },
            ])
        )

        interaction.reply({ embeds: [embed], components: [row] })
        
    }
}

export const slash_data = {
    name: data.name,
    description: data.description,
}