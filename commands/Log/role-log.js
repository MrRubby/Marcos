import { EmbedBuilder, PermissionsBitField, ChannelSelectMenuBuilder, ChannelType, ActionRowBuilder, ComponentType } from "discord.js"
import { t } from "i18next"
import database from "../../utils/database/guilds_Schema.js"

export const data = {
    name: "role-log",
    description: "Sets the mod log channel",

    async execute(interaction) {

        const menuName = t("rolelog.menuName", { lng: interaction.locale})

        const channelMenu = new ChannelSelectMenuBuilder()
        .setCustomId(interaction.id)
        .setPlaceholder(menuName)
        .setMaxValues(1)
        .setChannelTypes(ChannelType.GuildText)

        const Embed = new EmbedBuilder()
        .setDescription(t("rolelog.embed", {lng: interaction.locale}))
        .setColor("Purple")

        const SelectActionRow = new ActionRowBuilder().setComponents(channelMenu)

        const reply = await interaction.reply({ embeds: [Embed], components: [SelectActionRow] })

        const collector = reply.createMessageComponentCollector({
            componentType: ComponentType.ChannelSelect,
            filter: (i) => i.user.id === interaction.user.id && i.customId === interaction.id,
            time: 60_000,
        })

        collector.on("collect",async (interaction) => {

            if(interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) {

                await database.updateOne({ guild_id: interaction.guild.id }, { rolelog_id: interaction.values.join() }, { upsert: true })
                interaction.reply({ content: t("rolelog.set_succes", {lng: interaction.locale}) })

                const setEmbed = new EmbedBuilder()
                .setDescription(t("rolelog.set_embed", {lng: interaction.locale}))
                .setColor("Blue")

                const { rolelog_id } = await database.findOne({ guild_id: interaction.guild.id })
                const channelLog = interaction.guild.channels.cache.get(rolelog_id)

                channelLog.send({ embeds: [setEmbed] })

            } else {

                interaction.reply({ content: t("missing_permissions", {ns: "common", lng: interaction.locale}) })
    
            }
        })
    }
}

export const slash_data = {
    name: data.name,
    description: data.description,
}