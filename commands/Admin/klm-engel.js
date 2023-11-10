import { EmbedBuilder, PermissionsBitField } from "discord.js"
import { t } from "i18next"
import database from "../../utils/database/guilds_Schema.js"

export const data = {
    name: "word-block",
    description: "You can determine the working state of the word prevention system",

    async execute(interaction) {

        if(!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator))
        return interaction.reply({ content: t("missing_permissions", {ns: "common", lng: interaction.locale}) })

        const SubCmd = interaction.options.getSubcommand();

        switch(SubCmd) {
            case "status" : {

                const durum = interaction.options.get("system-status").value;
                if(durum === "on"){

                    await database.updateOne({ guild_id: interaction.guild.id}, {kelimeEngl: true}, {upsert: true})
                    interaction.reply("sistem aktif embed")

                } else if(durum === "off") {

                    await database.updateOne({ guild_id: interaction.guild.id}, {kelimeEngl: false}, {upsert: true})
                    interaction.reply("sistem kapalı embed")

                }
                break;
            }
            case "add" : {
                let { kelimeEngl } = await database.findOne({ guild_id: interaction.guild.id })
                if(!kelimeEngl) return interaction.reply("sistem aktif değil embed")
                const kelime = interaction.options.getString("word")
                const d = await database.findOne({ guild_id: interaction.guild.id, bKlm: kelime })
                if(d) return interaction.reply("kelime sistemde ekli embed")
                await database.updateOne({ guild_id: interaction.guild.id}, {$push: {bKlm: kelime}}, {upsert: true})
                interaction.reply(`\`${kelime}\` kelimesi, yasaklanan kelimelere eklendi`)
                break;
            }
            case "del" : {
                let { kelimeEngl } = await database.findOne({ guild_id: interaction.guild.id })
                if(!kelimeEngl) return interaction.reply("sistem aktif değil embed")
                const kelime = interaction.options.getString("word")
                const d = await database.findOne({ guild_id: interaction.guild.id, bKlm: kelime })
                if(!d) return interaction.reply("kelime sistemde değil embed")
                await database.updateOne({ guild_id: interaction.guild.id}, {$pull: {bKlm: kelime}}, {upsert: true})
                interaction.reply(`\`${kelime}\` kelimesi, yasaklanan kelimerden silindi`)
                break;
            }
            case "filter-list" : {
                let { kelimeEngl } = await database.findOne({ guild_id: interaction.guild.id })
                if(!kelimeEngl) return interaction.reply("sistem aktif değil embed")
                const db = await database.findOne({ guild_id: interaction.guild.id })
                const bKlm = db.bKlm || null
                if(!bKlm == null ) return interaction.reply("sistemde hiç kelime yok embed")
                //if(d.bKlm.length <= 0) return interaction.reply("sistemde kelime yok 2 embed")
                const kelimeler = bKlm.join(", ")
                const KelimeList = new EmbedBuilder()
                .setTitle(`Yasaklı Kelime Listesi`)
                .setDescription(`\`${kelimeler}\``)
                interaction.reply({ embeds: [KelimeList] })
                break;
            }
            case "filter-reset" : {
                let { kelimeEngl } = await database.findOne({ guild_id: interaction.guild.id })
                if(!kelimeEngl) return interaction.reply("sistem aktif değil embed")
                await database.updateOne({ guild_id: interaction.guil.id}, {$set: {bKlm: []}}, {upsert: true})
                const resetEmbed = new EmbedBuilder()
                .setTitle(`Kelime Listesi Temizlendi`)
                .setDescription(`Artık sistemde hiç kelime yok`)
                interaction.reply({ embeds: [resetEmbed] })
                break;
            }
        }
    }
}

export const slash_data = {
    name: data.name,
    description: data.description,
    type: 1,
    options: [
        {
            name: "status",
            description: "You can switch the word blocking system on and off",
            type: 1,
            options: [
                {
                    name: "system-status",
                    description: "You can switch the word blocking system on and off",
                    type: 3,
                    required: true,
                    choices: [
                        {name: "Open System",value: "on"},
                        {name: "Switch Off System",value: "off"}
                    ]
                }
            ]
        },
        {
            name: "add",
            description: "You can add words to your filter",
            type: 1,
            options: [
                {
                    name: "word",
                    description: "Specify the word you want to block",
                    type: 3,
                    required: true
                }
            ]
        },
        {
            name: "del",
            description: "You can remove the blocked word from the filter",
            type: 1,
            options: [
                {
                    name: "word",
                    description: "Specify the word you want to unblock",
                    type: 3,
                    required: true
                }
            ]
        },
        {
            name: "filter-list",
            description: "You can see a list of your block filter",
            type: 1
        },
        {
            name: "filter-reset",
            description: "You can clean your entire obstacle filter",
            type: 1
        }
    ]
}