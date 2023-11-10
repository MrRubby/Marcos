import { EmbedBuilder } from "discord.js"
import database from "../utils/database/guilds_Schema.js"
import { t } from "i18next"
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const yetkiler = require('../utils/Bot/perm.json');

/*const { default: yetkiler } = await import("../utils/Bot/perm.json", {
    assert: {
      type: "json",
    },
  });*/

export default client => {

    client.on("roleUpdate", async (oldRole, newRole) => {

        const { rolelog_id } = await database.findOne({ guild_id: oldRole.guild.id }) || { rolelog_id: null}
        if(!rolelog_id) return

        const channel = oldRole.guild.channels.cache.get(rolelog_id)

        channel.send({
            embeds: [new EmbedBuilder()
            .setTitle(t("roleUpdate.title", { ns: "common", lng: newRole.guild.locale}))
            .setDescription(t("roleUpdate.description", { ns: "common", lng: newRole.guild.locale}))
            .setThumbnail(oldRole.client.user.avatarURL({ dynamic: true}))
            .addFields(
            {name : t("roleUpdate.roleName", { ns: "common", lng: newRole.guild.locale}) ,value:oldRole.name,inline:true},
            {name : t("roleUpdate.roleColor", { ns: "common", lng: newRole.guild.locale}) ,value:`${oldRole.hexColor}`,inline:true},
            {name : t("roleUpdate.roleIcon", { ns: "common", lng: newRole.guild.locale}) ,value:oldRole.iconURL() ? `${t("roleUpdate.view", { ns: "common", lng: newRole.guild.locale})}(${oldRole.iconURL()})` : t("roleUpdate.noneIcon", { ns: "common", lng: newRole.guild.locale}) ,inline:true},
                
  
            {name : t("roleUpdate.roleName2", { ns: "common", lng: newRole.guild.locale}) ,value:newRole.name,inline:true},
            {name : t("roleUpdate.roleColor2", { ns: "common", lng: newRole.guild.locale}) ,value:`${newRole.hexColor}`,inline:true},
            {name : t("roleUpdate.roleIcon2", { ns: "common", lng: newRole.guild.locale}) ,value:newRole.iconURL() ? `${t("roleUpdate.view", { ns: "common", lng: newRole.guild.locale})}(${newRole.iconURL()})` : t("roleUpdate.noneIcon", { ns: "common", lng: newRole.guild.locale}) ,inline:true},
            {name : t("roleUpdate.update", { ns: "common", lng: newRole.guild.locale}) ,value:`<t:${parseInt(new Date() / 1000)}:R>`,inline:true},
            {name : t("roleUpdate.updateAuth", { ns: "common", lng: newRole.guild.locale}) ,value:`${t("roleUpdate.addAuth", { ns: "common", lng: newRole.guild.locale})}
            ${newRole.permissions.toArray().map(x => {
                if(oldRole.permissions.toArray().includes(x)) return;
                return yetkiler[x];
            }).join(" ")}
            ${t("roleUpdate.removeAuth", { ns: "common", lng: newRole.guild.locale})}
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