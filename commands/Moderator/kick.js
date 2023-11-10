import { EmbedBuilder, PermissionsBitField } from "discord.js"
import { t } from "i18next"
import database from "../../utils/database/guilds_Schema.js"

export const data = {
    name: "kick",
    description: "Banishes the user from the server",


    async execute(interaction) {

        const kickData = (await database.findOne({ guild_id: interaction.guild.id })) || null;
        const kickRol = kickData ? kickData.kickrole_id : null;

        if (interaction.member.roles.cache.has(kickRol) || interaction.member.permissions.has(PermissionsBitField.Flags.KickMembers))
        {
            const user = interaction.options.getMember("user");
            const reason = interaction.options.getString("reason");

            if (user.id === interaction.member.id) return interaction.reply({ content: t("kick.error-6", {lng: interaction.locale}),ephemeral: true,})
            if (user.id === interaction.client.user.id) return interaction.reply({content: t("kick.error-5", {lng: interaction.locale}),ephemeral: true,})
            if (user.id === interaction.guild.ownerID) return interaction.reply({content: t("kick.error-4", {lng: interaction.locale}),ephemeral: true,})
            if (user.permissions.has(PermissionsBitField.Flags.BanMembers)) return interaction.reply({content: t("kick.error-3", {lng: interaction.locale}),ephemeral: true,})
            if (user.roles.cache.has(kickRol)) return interaction.reply({content: t("kick.error-2", {lng: interaction.locale}),ephemeral: true,})
            try {

                interaction.guild.members.fetch(user.id)
                .then(() => {
                    interaction.reply({ content: t("kick.error-1", {lng: interaction.locale}) })
                })
            } catch {
                await user.kick(reason)
                interaction.reply({ content: t("kick.succes", {lng: interaction.locale, user: user.id}) })
            }
        } else 
        return interaction.reply({ content: t("missing_permissions", {ns: "common", lng: interaction.locale}) })
        
    }
}

export const slash_data = {
    name: data.name,
    description: data.description,
    type: 1,
    options:[
        {
          name: "user",
          description: "Specify the user to kick from the server",
          type: 6,
          required: true
        },
        {
            name: "reason",
            description: "Specify the reason why the user was kicked off the server",
            type: 3,
            required: true
        }
        
    ]
}