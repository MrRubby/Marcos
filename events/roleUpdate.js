import { EmbedBuilder } from "discord.js"
import guilds_Schema from "../utils/database/guilds_Schema.js"

const { default: yetkiler } = await import("../utils/Bot/perm.json", {
    assert: {
      type: "json",
    },
  });

export default client => {

    client.on("roleUpdate", async (oldRole, newRole) => {

        const { rolelog_id } = await guilds_Schema.findOne({ guild_id: oldRole.guild.id }) || { rolelog_id: null}
        if(!rolelog_id) return

        const channel = oldRole.guild.channels.cache.get(rolelog_id)

        channel.send({
            embeds: [new EmbedBuilder()
            .setTitle("Rol Güncellemesi")
            .setDescription(`**Az önce sunucunda bulunan bir rol güncellendi. Güncelleme detayları aşağıda görüntülenmektedir.**`)
            .setThumbnail(oldRole.client.user.avatarURL({ dynamic: true}))
            .addFields(
            {name:"Eski Rol Adı",value:oldRole.name,inline:true},
            {name:"Eski Rol Rengi",value:`${oldRole.hexColor}`,inline:true},
            {name:"Eski Rol ikonu",value:oldRole.iconURL() ? `[Görüntüle](${oldRole.iconURL()})`:"Icon Yok",inline:true},
                
  
            {name:"Yeni Rol Adı",value:newRole.name,inline:true},
            {name:"Yeni Rol Rengi",value:`${newRole.hexColor}`,inline:true},
            {name:"Yeni Rol ikonu",value:newRole.iconURL() ? `[Görüntüle](${newRole.iconURL()})`:"Icon Yok",inline:true},
            {name:"Güncellenme tarihi",value:`<t:${parseInt(new Date() / 1000)}:R>`,inline:true},
            {name:"Güncellenen Yetkiler",value:`**Eklenen Yetkiler**
            ${newRole.permissions.toArray().map(x => {
                if(oldRole.permissions.toArray().includes(x)) return;
                return yetkiler[x];
            }).join(" ")}
            **Kaldırılan Yetkiler**
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