import { EmbedBuilder } from "discord.js"
import guilds_Schema from "../utils/database/guilds_Schema.js"

export default client => {

    client.on("roleCreate", async (role) => {

        const { rolelog_id } = await guilds_Schema.findOne({ guild_id: role.guild.id }) || { rolelog_id: null}
        if(!rolelog_id) return

        const channel = role.guild.channels.cache.get(rolelog_id)

        channel.send({
            embeds: [new EmbedBuilder()
            .setTitle("Rol Oluşturuldu")
            .setDescription(`**Az önce sunucunda bir rol oluşturuldu. Oluşturulan rol detayları aşağıda görüntülenmektedir.**`)
            .setThumbnail(role.client.user.avatarURL({ dynamic: true}))
            .addFields({name:"Rol Adı",value:role.name,inline:true},
            {name:"Rol Rengi",value:`${role.hexColor}`,inline:true},
            {name:"Rol ikonu",value:role.iconURL() ? `[Görüntüle](${role.iconURL()})`:"Icon Yok",inline:true},
            {name:"Oluşturulma tarihi",value:`<t:${parseInt(role.createdTimestamp / 1000)}:R>`,inline:true})
      
            .setColor("Green")
            .setFooter({text:`${role.guild.name}`})
            .setTimestamp()
        ]})

    })

}