import { EmbedBuilder, PermissionsBitField } from "discord.js"
import { t } from "i18next"
import guilds_Schema from "../../utils/database/guilds_Schema.js"

export const data = {
    name: "ban",
    description: "Get information about the system status",


    async execute(interaction) {

        const adminData = await guilds_Schema.findOne({ guild_id: interaction.guild.id}) || null
        const adminRol = adminData ? adminData.adminrole_id : null

        const userData = await guilds_Schema.findOne({ guild_id: interaction.guild.id}) || null
        const userRol = userData ? userData.userrole_id : null

        const user = interaction.options.getMember("user")
        const name = interaction.options.getString("name")
        const age = interaction.options.getString("age")

        if(!interaction.member.roles.cache.has(adminRol))
        return interaction.reply({ content: t("missing_permissions", {ns: "common", lng: interaction.locale}) })

        interaction.guild.members.cache.get(user.id).roles.add(userRol)
        user.setNickname(`${isim} | ${yas}`)

        interaction.reply({ content: t("registry.succes", {lng: interaction.locale}) })
        
    }
}

export const slash_data = {
    name: data.name,
    description: data.description,
    type: 1,
    options:[
        {
          name: "user",
          description: "kullanıcı belirt",
          type: 6,
          required: true
        },
        {
            name: "name",
            description: "isim belirt",
            type: 3,
            required: true
        },
        {
            name: "age",
            description: "yaş belirt",
            type: 3,
            required: true
        }
    ]
}