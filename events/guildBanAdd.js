import { EmbedBuilder } from "discord.js"
import database from "../utils/database/guilds_Schema.js"
import { t } from "i18next"

export default client => {

    client.on("guildBanAdd", async (_,ban) => {

        const { modlog_id } = await database.findOne({ guild_id: ban.guild.id }) || { modlog_id: null }
        if (!modlog_id) return

        const logs = ban.guild.channels.cache.get(modlog_id)

        const response = new EmbedBuilder()
        .setAuthor({name:ban.user.tag,iconURL: ban.user.avatarURL()})
        .setDescription(t("guildBanAdd.descripton", { ns: "common", lng: ban.guild.locale, user: ban.user}))
        .addFields({name: t("guildBanAdd.addFields.reason", { ns: "common", lng: ban.guild.locale }) ,value:`\`\`\`${ban.reason}\`\`\``,inline:false})
        .setColor("#2ACAEA")
        .setFooter({text:`${ban.guild.name}`})
        .setTimestamp()
        logs.send({ embeds: [response]})

    })

}