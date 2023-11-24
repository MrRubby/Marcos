import { EmbedBuilder } from "discord.js"
import database from "../utils/database/guilds_Schema.js"
import { t } from "i18next"
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const yetkiler = require('../utils/Bot/perm.json');

export default client => {

    client.on("roleUpdate", async (oldRole, newRole) => {

        const { rolelog_id } = await database.findOne({ guild_id: oldRole.guild.id }) || { rolelog_id: null}
        if(!rolelog_id) return

        const channel = oldRole.guild.channels.cache.get(rolelog_id)

        channel.send({
            embeds: [new EmbedBuilder()
            .setTitle(t("roleUpdate.title", { ns: "event", lng: newRole.guildLocale}))
            .setDescription(t("roleUpdate.description", { ns: "event", lng: newRole.guildLocale}))
            .setThumbnail(oldRole.client.user.avatarURL({ dynamic: true}))
            .addFields(
            {name : t("roleUpdate.addFields.roleName", { ns: "event", lng: newRole.guildLocale}) ,value:oldRole.name,inline:true},
            {name : t("roleUpdate.addFields.roleColor", { ns: "event", lng: newRole.guildLocale}) ,value:`${oldRole.hexColor}`,inline:true},
            {name : t("roleUpdate.addFields.roleIcon", { ns: "event", lng: newRole.guildLocale}) ,value:oldRole.iconURL() ? `${t("roleUpdate.view", { ns: "event", lng: newRole.guildLocale})}(${oldRole.iconURL()})` : t("roleUpdate.addFields.noneIcon", { ns: "event", lng: newRole.guildLocale}) ,inline:true},
                
  
            {name : t("roleUpdate.addFields.roleName2", { ns: "event", lng: newRole.guildLocale}) ,value:newRole.name,inline:true},
            {name : t("roleUpdate.addFields.roleColor2", { ns: "event", lng: newRole.guildLocale}) ,value:`${newRole.hexColor}`,inline:true},
            {name : t("roleUpdate.addFields.roleIcon2", { ns: "event", lng: newRole.guildLocale}) ,value:newRole.iconURL() ? `${t("roleUpdate.addFields.view", { ns: "event", lng: newRole.guildLocale})}(${newRole.iconURL()})` : t("roleUpdate.addFields.noneIcon", { ns: "event", lng: newRole.guildLocale}) ,inline:true},
            {name : t("roleUpdate.addFields.update", { ns: "event", lng: newRole.guildLocale}) ,value:`<t:${parseInt(new Date() / 1000)}:R>`,inline:true},
            {name : t("roleUpdate.addFields.updateAuth", { ns: "event", lng: newRole.guildLocale}) ,value:`${t("roleUpdate.addFields.addAuth", { ns: "event", lng: newRole.guildLocale})}
            ${newRole.permissions.toArray().map(x => {
                if(oldRole.permissions.toArray().includes(x)) return;
                return yetkiler[x];
            }).join(" ")}
            ${t("roleUpdate.addFields.removeAuth", { ns: "event", lng: newRole.guildLocale})}
            ${
                oldRole.permissions.toArray().map(x => {
                 if(newRole.permissions.toArray().includes(x)) return;
                    return yetkiler[x];
                }).join(" ")
            }`,inline:false})
            .setColor("Orange")
            .setFooter({text:`${newRole.guild.name}`})
            .setTimestamp()
        ]})

    })

}