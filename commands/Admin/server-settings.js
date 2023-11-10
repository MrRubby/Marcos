import { Client, EmbedBuilder, PermissionsBitField } from "discord.js"
import { t } from "i18next"
import database from "../../utils/database/guilds_Schema.js"

export const data = {
    name: "server-settings",
    description: "You can see the server settings",

    async execute (interaction, client) {

        if(!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator))
        return interaction.reply({ content: t("missing_permissions", {ns: "common", lng: interaction.locale}) })

        let modlg;
        let hbbb;
        let rolg;
        let msglg;
        let chlg;
        let banD;
        let kick;
        let kyt;
        let otorol;

        const { kfrEngel, lnkEngl, kelimeEngl, modlog_id, welcomelog_id, rolelog_id, messagelog_id, channellog_id } = await database.findOne({ guild_id: interaction.guild.id }) ||
        { kfrEngel: false, lnkEngl: false, kelimeEngl: false, modlog_id: null, welcomelog_id: null, rolelog_id: null, messagelog_id: null, channellog_id: null };

        const { registersystem } = await database.findOne({ guild_id: interaction.guild.id }) || {registersystem:false};
        if(!registersystem) kyt = false; else kyt = true;

        const { autorolesystem } = await database.findOne({ guild_id: interaction.guild.id }) || {autorolesystem:false};
        if(!autorolesystem) otorol = false; else otorol = true;

        const { bansystem } = await database.findOne({ guild_id: interaction.guild.id }) || { bansystem: false };
        if(!bansystem) banD = false; else banD = true;

        const { kicksystem } = await database.findOne({ guild_id: interaction.guild.id }) || { kicksystem: false };
        if(!kicksystem) kick = false; else kick = true;

        if(!modlog_id) modlg = false; else modlg = true;
        if(!welcomelog_id) hbbb = false; else hbbb = true;
        if(!rolelog_id) rolg = false; else rolg = true;
        if(!messagelog_id) msglg = false; else msglg = true;
        if(!channellog_id) chlg = false; else chlg = true;

        const response = new EmbedBuilder()
        .setTitle(t("settings.title", {lng: interaction.locale, GuildName: interaction.guild.name}))
        .setDescription(t("settings.description", {lng: interaction.locale}))
        .setThumbnail(interaction.guild.iconURL({ dynamic: true}))
        .addFields([
            {name: t("ban_system", {ns: "common", lng: interaction.locale}), value:`${banD ? t("open", {ns: "common", lng: interaction.locale}) : t("close", {ns: "common", lng: interaction.locale})}`,inline:true},
            {name: t("kick_system", {ns: "common", lng: interaction.locale}), value:`${kick ? t("open", {ns: "common", lng: interaction.locale}) : t("close", {ns: "common", lng: interaction.locale})}`,inline:true},
            {name: t("autorole_system", {ns: "common", lng: interaction.locale}), value:`${otorol ? t("open", {ns: "common", lng: interaction.locale}) : t("close", {ns: "common", lng: interaction.locale})}`,inline:true},
            {name: t("registry_system", {ns: "common", lng: interaction.locale}), value:`${kyt ? t("open", {ns: "common", lng: interaction.locale}) : t("close", {ns: "common", lng: interaction.locale})}`,inline:true},
            {name: t("kfrEngel_system", {ns: "common", lng: interaction.locale}), value:`${kfrEngel ? t("open", {ns: "common", lng: interaction.locale}) : t("close", {ns: "common", lng: interaction.locale})}`,inline:true},
            {name: t("klmEngel_system", {ns: "common", lng: interaction.locale}),value:`${kelimeEngl ? t("open", {ns: "common", lng: interaction.locale}) : t("close", {ns: "common", lng: interaction.locale})}`,inline:true},
            {name: t("lnkEngel_system", {ns: "common", lng: interaction.locale}),value:`${lnkEngl ? t("open", {ns: "common", lng: interaction.locale}) : t("close", {ns: "common", lng: interaction.locale})}`,inline:true},
            {name: t("modlog_system", {ns: "common", lng: interaction.locale}), value:`${modlg ? t("justed", {ns: "common", lng: interaction.locale}) : t("unjusted", {ns: "common", lng: interaction.locale})}`,inline:true},
            {name: t("inoutcoming_system", {ns: "common", lng: interaction.locale}), value:`${hbbb ? t("justed", {ns: "common", lng: interaction.locale}) : t("unjusted", {ns: "common", lng: interaction.locale})}`,inline:true},
            {name: t("rolelog_system", {ns: "common", lng: interaction.locale}), value:`${rolg ? t("justed", {ns: "common", lng: interaction.locale}) : t("unjusted", {ns: "common", lng: interaction.locale})}`,inline:true},
            {name: t("messagelog_system", {ns: "common", lng: interaction.locale}), value:`${msglg ? t("justed", {ns: "common", lng: interaction.locale}) : t("unjusted", {ns: "common", lng: interaction.locale})}`,inline:true},
            {name: t("channellog_system", {ns: "common", lng: interaction.locale}), value:`${chlg ? t("justed", {ns: "common", lng: interaction.locale}) : t("unjusted", {ns: "common", lng: interaction.locale})}`,inline:true},
        ])
        .setTimestamp()
        .setFooter({ text: `${interaction.client.user.username} ❤️`, iconURL: interaction.client.user.displayAvatarURL() })
        interaction.reply({ embeds: [response] })
    }
}

export const slash_data = {
    name: data.name,
    description: data.description
}