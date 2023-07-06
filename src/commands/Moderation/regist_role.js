import { EmbedBuilder, PermissionsBitField } from "discord.js"
import { t } from "i18next"
import guilds_Schema from "../../utils/database/guilds_Schema.js"

export const data = {
    name: "ban",
    description: "Get information about the system status",


    async execute(interaction) {

        if(!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator))
        return interaction.reply({ content: t("missing_permissions", {ns: "common", lng: interaction.locale}) })

        const adminRol = interaction.options.getRole("admin-role")
        const userRol = interaction.options.getRole("user-role")

        let SubCmd = interaction.options.getSubCommand()

        switch(SubCmd){
            case "set": {
                const { registersystem } = await guilds_Schema.findOne({ guild_id: interaction.guild.id}) || { registersystem: false }
                if(!registersystem) return interaction.reply({ content: t("registrolesystem.error", {lng: interaction.locale}) })

                await guilds_Schema.findOneAndUpdate({ guild_id: interaction.guild.id}, { $set: { adminrole_id: adminRol.id, userrole_id: userRol.id} }, { upsert: true})
                .then(() => {
                    interaction.reply({ content: t("registrolesystem.set_succes", {lng: interaction.locale, adminrol: adminRol.id, userrol: userRol.id}) })
                })
                break
            }
            case "reset" : {
                const { registersystem } = await guilds_Schema.findOne({ guild_id: interaction.guild.id}) || { adminrole_id: null, userrole_id: null }
                if(!registersystem) return interaction.reply({ content: t("registrolesystem.error-2", {lng: interaction.locale}) })
                
                await guilds_Schema.findOneAndUpdate({ guild_id: interaction.guild.id }, { $set: { adminrole_id: null, userrole_id: null } }, { upsert: true})
                .then(() => {
                    interaction.reply({ content: t("registrolesystem.res_succes", {lng: interaction.locale}) })
                })
            }
        }
        
    }
}

export const slash_data = {
    name: data.name,
    description: data.description,
    type: 1,
    options:[
        {
          name: "set",
          description: "kullanıcı belirt",
          type: 1,
          options: [
            {
                name: "admin-role",
                description: "admin role belirt",
                type: 8,
                required: true
            },
            {
                name: "user-role",
                description: "user role belirt",
                type: 8,
                required: true
            }
          ]
        },
        {
            name: "reset",
            description: "sistemi sıfırlar",
            type: 1
        }
    ]
}