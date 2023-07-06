import { EmbedBuilder, PermissionsBitField } from "discord.js"
import { t } from "i18next"
import guilds_Schema from "../../utils/database/guilds_Schema.js"

export const data = {
    name: "unban",
    description: "Get information about the system status",


    async execute(interaction) {

        const data = await guilds_Schema.findOne({guild_id: interaction.guild.id}) || null;
        const banRol = data ? data.banrole_id : null;
    
        if(interaction.member.roles.cache.has(banRol) || interaction.member.permissions.has(PermissionsBitField.Flags.BanMembers)) {

            const userID = interaction.options.getString("id")
            try{

                await interaction.guild.bans.fetch(userID)
                .then((s) => {
                    interaction.guild.members.unban(userID)
                    interaction.reply({ content: t("unban.succes", {lng: interaction.locale}) })
                })

            } catch {

                interaction.reply({ content: t("unban.error", {lng: interaction.locale}) })

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
          name: "id",
          description: "user belirt",
          type: 3,
          required: true
        }      
    ]
}