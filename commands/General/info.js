import { EmbedBuilder } from "discord.js"
import { t } from "i18next"
import embeds from "../../utils/bot/embeds.js"

export const data = {
    name: "info",
    description: "You can see server or bot-side information",

    async execute(interaction) {

        let SubCmd = interaction.options.getSubcommand()

        switch(SubCmd) {
            case "server" : {

                const serverInfoEmbed = new EmbedBuilder()
                .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL() })
                .setFields[
                    { name: "Owner", value: (await interaction.guild.fetchOwner()).user.tag, inline: true}
                    //{ name: "Text Channel", value: interaction.guild.channels.cache.filter((c) => c.type === 0).toJSON().length, inline: true}
                ]

                interaction.reply({ embeds: [serverInfoEmbed] })
                break

            }
            case "bot" : {

                const start = Date.now();
                const end = Date.now();
                const { ws } = interaction.client

                interaction.reply(t("ping.reply_message", {lng: interaction.locale})).then(msg => {

                    const embed = new EmbedBuilder()
                    .setColor("Red")
                    .setTitle(interaction.user.username + " - Pong!")
                    .setThumbnail(interaction.guild.iconURL())
                    .addFields([
                        { name: t("ping.message_speed", {lng: interaction.locale}), value: `\`${end - start}ms\` 🛰️` },
                        { name: t("ping.message_response_speed", {lng: interaction.locale}), value: `\`${Date.now() - start}ms\` 🛰️` },
                        { name: t("ping.apı_response_speed", {lng: interaction.locale}), value: `\`${Math.round(ws.ping)}ms\` 🛰️` }
                    ])
                    .setTimestamp()
                    .setFooter({ text: `${interaction.client.user.username} ❤️` })
                    interaction.editReply({ embeds: [embed] })
                })  
                break
            }
        }
    }
}

export const slash_data = {
    name: data.name,
    description: data.description,
    options: [
        {
            name: "server",
            description: "Displays information about the server",
            type: 1
        },
        {
            name: "bot",
            description: "Displays information about the bot",
            type: 1
        }
    ]
}