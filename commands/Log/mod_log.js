import { EmbedBuilder, PermissionsBitField } from "discord.js"
import { t } from "i18next"
import guilds_Schema from "../../utils/database/guilds_Schema.js"

export const data = {
    name: "mod-log",
    description: "The moderator sets the log channel",


    async execute(interaction) {

        let channel = interaction.options.getChannel("channel")

        if(interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) {

            let SubCmd = interaction.options.getSubcommand()

            switch(SubCmd){
                case "set": {

                    await guilds_Schema.updateOne({ guild_id: interaction.guild.id }, { modlog_id: channel.id }, { upsert: true })
                    interaction.reply({ content:  t("modlog.set_succes", {lng: interaction.locale}) })

                    const setEmbed = new EmbedBuilder()
                    .setDescription( t("modlog.set_embed", {lng: interaction.locale}) )
                    .setColor("Blue")

                    channel.send({ embeds: [setEmbed] })
                    break
                    
                }
                case "reset": {

                    await guilds_Schema.updateOne({ guild_id: interaction.guild.id }, { modlog_id: null }, { upsert: true })
                    interaction.reply({ content: t("modlog.res_succes", {ns: "common", lng: interaction.locale}) })
                    break
                    
                }
            }
        } else {

            interaction.reply({ content: t("missing_permissions", {ns: "common", lng: interaction.locale}) })

        }
    }
}

export const slash_data = {
    name: data.name,
    description: data.description,
    options:[
        {
          name: "set",
          description: "make an installation",
          type: 1,
          options:[
            {
                name: "channel",
                description: "specify the channel",
                type: 7,
                required: true,
                channel_types: [0]
            }
          ]
        },
        {
            name: "reset",
            description: "The moderator turns off the log system",
            type: 1
        }
        
    ]
}