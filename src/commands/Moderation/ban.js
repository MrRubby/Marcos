import { EmbedBuilder, PermissionsBitField } from "discord.js"
import { t } from "i18next"
import guilds_Schema from "../../utils/database/guilds_Schema.js"

export const data = {
    name: "ban",
    description: "Bans the user from the server",


    async execute(interaction) {

        const data = await guilds_Schema.findOne({guild_id: interaction.guild.id}) || null;
        const banRol = data ? data.banrole_id : null;
    
        if(interaction.member.roles.cache.has(banRol) || interaction.member.permissions.has(PermissionsBitField.Flags.BanMembers)) {

            const user = interaction.options.getMember("user")
            const reason = interaction.options.getString("reason")
    
            if(!user) return interaction.reply({ content: t("ban.error-7", { lng: interaction.locale }) })
            if(user.id == interaction.member.id) return interaction.reply({ content: t("ban.error-6", { lng: interaction.locale }) })
            if(user.id == interaction.client.user.id) return interaction.reply({ content: t("ban.error-5", { lng: interaction.locale }) })
            if(user.id == interaction.guild.ownerID) return interaction.reply({ content: t("ban.error-4", { lng: interaction.locale }) })
            if(user.permissions.has(PermissionsBitField.Flags.BanMembers)) return interaction.reply({ content: t("ban.error-3", { lng: interaction.locale }) })
            if(user.roles.cache.get(banRol)) return interaction.reply({ content: t("ban.error-2", { lng: interaction.locale }) })
            try{
                await interaction.guild.bans.fetch(user.id)
                .then(() => {
                    interaction.reply({ content: t("ban.error-1", { lng: interaction.locale }) })
                })
            } catch {
                user.ban({ reason: reason })
                interaction.reply({ content: t("ban.succes", {lng: interaction.locale}) })
            }
        }else
        interaction.reply({ content: t("missing_permissions", {ns: "common", lng: interaction.locale}) })
    }
}

export const slash_data = {
    name: data.name,
    description: data.description,
    type: 1,
    options:[
        {
          name: "user",
          description: "Specify the user",
          type: 6,
          required: true
        },
        {
            name: "reason",
            description: "Specify the reason",
            type: 3,
            required: true
        }
        
    ]
}