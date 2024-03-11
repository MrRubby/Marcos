import { EmbedBuilder, PermissionsBitField } from "discord.js"
import { t } from "i18next"
import database from "../utils/database/guilds_Schema.js"

export const data = {
    name: "blasphemy-block",
    description: "You can determine the operating status of the anti-moulding system",

    async execute(interaction) {

        if(!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator))
        return interaction.reply({ content: t("missing_permissions", {ns: "common", lng: interaction.locale}) })

        const durum = interaction.options.get("status").value;

        if(durum === "on") {

            await database.updateOne({guild_id: interaction.guild.id}, {kfrEngel: true}, {upsert: true});
            const kfrOn = new EmbedBuilder()
            .setTitle(t("kfrEngel.on.title", {lng: interaction.locale}))
            .setDescription(t("kfrEngel.on.description", {lng: interaction.locale}))
            .setThumbnail(interaction.guild.iconURL())
            .setColor("Purple")
            interaction.reply({ embeds: [kfrOn]})

        } else if(durum === "off") {

            await database.updateOne({guild_id: interaction.guild.id}, {kfrEngel: false}, {upsert: true});
            const kfrOff = new EmbedBuilder()
            .setTitle(t("kfrEngel.off.title", {lng: interaction.locale}))
            .setDescription(t("kfrEngel.off.description", {lng: interaction.locale}))
            .setThumbnail(interaction.guild.iconURL())
            .setColor("Purple")
            interaction.reply({ embeds: [kfrOff]})

        }
    }
}

export const slash_data = {
    name: data.name,
    description: data.description,
    type: 1,
    options:[
        {
          name:"set",
          description:"Make a installation",
          type:1,
          options:[{
                name:"status",
                description:"You can switch the swearing blocking system on and off",
                type:3,
                required:true,
                choices: [
                    {
                        name: "Open System",
                        value: "on"
                    },
                    {
                        name: "Switch Off System",
                        value: "off"
                    }
                ]
            }]
        },    
    ]
}