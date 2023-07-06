import { Client, EmbedBuilder } from "discord.js"
import { t } from "i18next"
import guilds_Schema from "../../utils/database/guilds_Schema.js"

export const data = {
    name: "settings",
    description: "settings",

    async execute (interaction, client) {

        let modlg;
        let hbbb;
        let rolg;
        let msglg;
        let chlg;
        let banD;
        let kick;
        let kyt;
        let otorol;

        const { modlog_id, welcomelog_id, rolelog_id, messagelog_id, channellog_id } = await guilds_Schema.findOne({ guild_id: interaction.guild.id }) ||
        { modlog_id: null, welcomelog_id: null, rolelog_id: null, messagelog_id: null, channellog_id: null };

        const { registersystem } = await guilds_Schema.findOne({ guild_id: interaction.guild.id }) || {registersystem:false};
        if(!registersystem) kyt = false; else kyt = true;

        const { autorolesystem } = await guilds_Schema.findOne({ guild_id: interaction.guild.id }) || {autorolesystem:false};
        if(!autorolesystem) otorol = false; else otorol = true;

        const { bansystem } = await guilds_Schema.findOne({ guild_id: interaction.guild.id }) || { bansystem: false };
        if(!bansystem) banD = false; else banD = true;

        const { kicksystem } = await guilds_Schema.findOne({ guild_id: interaction.guild.id }) || { kicksystem: false };
        if(!kicksystem) kick = false; else kick = true;

        if(!modlog_id) modlg = false; else modlg = true;
        if(!welcomelog_id) hbbb = false; else hbbb = true;
        if(!rolelog_id) rolg = false; else rolg = true;
        if(!messagelog_id) msglg = false; else msglg = true;
        if(!channellog_id) chlg = false; else chlg = true;

        const response = new EmbedBuilder()
        .setTitle(t("settings.title", {lng: interaction.locale, GuildName: interaction.guild.name}))
        .setDescription(t("settings.description", {lng: interaction.locale}))
        .setThumbnail(interaction.client.user.avatarURL({ dynamic: true}))
        .addFields([
            {name: t("ban_system", {ns: "common", lng: interaction.locale}), value:`${banD ? t("open", {ns: "common", lng: interaction.locale}) : t("close", {ns: "common", lng: interaction.locale})}`,inline:true},
            {name: t("kick_system", {ns: "common", lng: interaction.locale}), value:`${kick ? t("open", {ns: "common", lng: interaction.locale}) : t("close", {ns: "common", lng: interaction.locale})}`,inline:true},
            {name: t("autorole_system", {ns: "common", lng: interaction.locale}), value:`${otorol ? t("open", {ns: "common", lng: interaction.locale}) : t("close", {ns: "common", lng: interaction.locale})}`,inline:true},
            {name: t("registry_system", {ns: "common", lng: interaction.locale}), value:`${kyt ? t("open", {ns: "common", lng: interaction.locale}) : t("close", {ns: "common", lng: interaction.locale})}`,inline:true},
            {name: t("modlog_system", {ns: "common", lng: interaction.locale}), value:`${modlg ? t("justed", {ns: "common", lng: interaction.locale}) : t("unjusted", {ns: "common", lng: interaction.locale})}`,inline:true},
            {name: t("inoutcoming_system", {ns: "common", lng: interaction.locale}), value:`${hbbb ? t("justed", {ns: "common", lng: interaction.locale}) : t("unjusted", {ns: "common", lng: interaction.locale})}`,inline:true},
            {name: t("rolelog_system", {ns: "common", lng: interaction.locale}), value:`${rolg ? t("justed", {ns: "common", lng: interaction.locale}) : t("unjusted", {ns: "common", lng: interaction.locale})}`,inline:true},
            {name: t("messagelog_system", {ns: "common", lng: interaction.locale}), value:`${msglg ? t("justed", {ns: "common", lng: interaction.locale}) : t("unjusted", {ns: "common", lng: interaction.locale})}`,inline:true},
            {name: t("channellog_system", {ns: "common", lng: interaction.locale}), value:`${chlg ? t("justed", {ns: "common", lng: interaction.locale}) : t("unjusted", {ns: "common", lng: interaction.locale})}`,inline:true},
        ])
        .setTimestamp()
        .setFooter({ text: `${interaction.client.user.username} ❤️` })
        interaction.reply({ embeds: [response] })
    }
}

export const slash_data = {
    name: data.name,
    description: data.description
}