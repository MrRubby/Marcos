import { EmbedBuilder, PermissionsBitField } from "discord.js"
import { t } from "i18next"

export const data = {
    name: "nuke",
    description: "kanalı baştan oluşturur",


    async execute(interaction) {

        if(!interaction.member.permissions.has(PermissionsBitField.Flags.ManageChannels))
        return interaction.reply({ content: t("missing_permissions", {ns: "common", lng: interaction.locale}) })

        let kanal = interaction.channel;
        kanal.clone(kanal.name, {reason: t("nuke.reason", {lng: interaction.locale}) }).then(async knl => {
           knl.setPosition(kanal.position);
           kanal.delete();
           knl.send(t("nuke.succes", {lng: interaction.locale})).then( msg => {
               setTimeout( function() {
                   msg.delete();
               },10000)
            })
        }) 
    }
}

export const slash_data = {
    name: data.name,
    description: data.description,
}