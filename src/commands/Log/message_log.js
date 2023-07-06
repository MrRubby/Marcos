import { EmbedBuilder, PermissionsBitField } from "discord.js"
import { t } from "i18next"
import guilds_Schema from "../../utils/database/guilds_Schema.js"

export const data = {
    name: "message-log",
    description: "gelen giden kanalı",


    async execute(interaction) {

        let channel = interaction.options.getChannel("channel")

        if(interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) {

            let SubCmd = interaction.options.getSubcommand()

            switch(SubCmd){
                case "set": {

                    await guilds_Schema.updateOne({ guild_id: interaction.guild.id }, { messagelog_id: channel.id }, { upsert: true })
                    interaction.reply({ content: t("messagelog.set_succes", {lng: interaction.locale} ) })

                    const setEmbed = new EmbedBuilder()
                    .setDescription(t("messagelog.set_embed", {lng: interaction.locale}))
                    .setColor("Blue")

                    channel.send({ embeds: [setEmbed] })
                    break
                    
                }
                case "reset": {

                    await guilds_Schema.updateOne({ guild_id: interaction.guild.id }, { messagelog_id: null }, { upsert: true })
                    interaction.reply({ content: t("messagelog.res_succes", {lng: interaction.locale} ) })
                    break
                    
                }
            }

        } else {

            interaction.reply({ content: t("missing_permissions", {ns: "common", lng: interaction.locale})})

        }
    }
}

export const slash_data = {
    name: data.name,
    description: data.description,
    options:[
        {
          name: "set",
          description: "kurulum yap",
          type: 1,
          options:[
            {
                name: "channel",
                description: "kanalı belirtin",
                type: 7,
                required: true,
                channel_types: [0]
            }
          ]
        },
        {
            name: "reset",
            description: "gelen giden sistemi kapatır",
            type: 1
        }
        
    ]
}