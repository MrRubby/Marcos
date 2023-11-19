import { EmbedBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder, } from "discord.js"
import { t } from "i18next"
import embeds from "../../utils/Bot/embeds.js"

export const data = {
    name: "lol",
    description: "You can give suggestions to the development team or report on the system",

    async execute(interaction) {

        const SubCmd = interaction.options.getSubcommand();

        const suggesChannel = interaction.client.channels.cache.get("1167878462359490620")
        const reportChannel = interaction.client.channels.cache.get("1167878462359490620")

        switch(SubCmd) {
            case "submit-feedback" : {

                const durum = interaction.options.get("selection").value;

                if(durum === "sugges"){

                    const suggestionFormu = new ModalBuilder()
                    .setCustomId("suggestionform")
                    .setTitle("Öneri Gönder")
                    const suggestionform = new TextInputBuilder()
                    .setCustomId("suggesform")
                    .setLabel("Önerinizi belirtin")
                    .setStyle(TextInputStyle.Paragraph)
                    .setMinLength(20)
                    .setMaxLength(200)
                    .setRequired(true)
                
                    const suggesSystem = new ActionRowBuilder().addComponents(suggestionform)
                    suggestionFormu.addComponents(suggesSystem)

                    await interaction.showModal(suggestionFormu)
                    await interaction.awaitModalSubmit({ filter: (interaction) => interaction.setCustomId === `suggestionform`, time: 60 * 60 * 1000}).then(async (interaction) => {
                    
                        const sugges = interaction.fields.getTextInputValue("suggesform")
                        const suggesEmbed = new EmbedBuilder()
                        .setTitle("Yeni Sugges")
                        .setDescription("Yeni bir öneri alındı")
                        .setThumbnail(interaction.user.displayAvatarURL())
                        .setFields(
                            { name: `Öneri Yapan`, value: `${interaction.user.username}`},
                            { name: "Öneri", value: `${sugges}`}
                        )
                        .setColor("Purple")
                        .setFooter({ text: "Feedback System", iconURL: interaction.client.displayAvatarURL()})
                        .setTimestamp()
                        suggesChannel.send({ embeds: [suggesEmbed] })
                    })

                } else if(durum === "report"){
                    
                    const reportFormu = new ModalBuilder()
                    .setCustomId("reportform")
                    .setTitle("Öneri Gönder")
                    const reportform = new TextInputBuilder()
                    .setCustomId("reportform")
                    .setLabel("şikayetinizi belirtin")
                    .setStyle(TextInputStyle.Paragraph)
                    .setMinLength(20)
                    .setMaxLength(200)
                    .setRequired(true)

                    const suggesSystem = new ActionRowBuilder().addComponents(reportform)
                    reportFormu.addComponents(suggesSystem)
                    await interaction.showModal(suggestionFormu)
                    await interaction.awaitModalSubmit({ filter: (interaction) => interaction.setCustomId === `reportform`, time: 60 * 60 * 1000}).then(async (interaction) => {
                    
                        const report = interaction.fields.getTextInputValue("reportform")
                        const reportEmbed = new EmbedBuilder()
                        .setTitle("Yeni Report")
                        .setDescription("Yeni bir Report alındı")
                        .setThumbnail(interaction.user.displayAvatarURL())
                        .setFields(
                            { name: `Öneri Yapan`, value: `${interaction.user.username}`},
                            { name: "Öneri", value: `${report}`}
                        )
                        .setColor("Purple")
                        .setFooter({ text: "Feedback System", iconURL: interaction.client.displayAvatarURL()})
                        .setTimestamp()
                        reportChannel.send({ embeds: [reportEmbed] })
                    })
                }
                break;
            }
        }

    }
}

export const slash_data = {
    name: data.name,
    description: data.description,
    options:[
        {
            name: "submit-feedback",
            description: "You can give suggestions to the development team or report on the system",
            type: 1,
            options:[
                {
                    name: "selection",
                    description: "Select the action you want to take",
                    type: 3,
                    choices: [
                        {
                            name: "submit-suggestion", 
                            description: "You can let us know your suggestions",
                            value: "sugges"
                        },
                        {
                            name: "submit-report", 
                            description: "You can inform us about the errors you see in the system",
                            value: "report"
                        }
                    ]
                }
            ]
        },
    ]
}