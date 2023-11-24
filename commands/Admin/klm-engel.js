import { Embed, EmbedBuilder, PermissionsBitField } from "discord.js"
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
                    const klmOn = new EmbedBuilder()
                    .setTitle(t("klmEngel.on.title", {lng: interaction.locale}))
                    .setDescription(t("klmEngel.on.description", {lng: interaction.locale}))
                    .setThumbnail(interaction.guild.iconURL())
                    .setColor("Purple")
                    interaction.reply({ embeds: [klmOn] })

                } else if(durum === "off") {

                    await database.updateOne({ guild_id: interaction.guild.id}, {kelimeEngl: false}, {upsert: true})
                    const klmOff = new EmbedBuilder()
                    .setTitle(t("klmEngel.off.title", {lng: interaction.locale}))
                    .setDescription(t("klmEngel.off.description", {lng: interaction.locale}))
                    .setThumbnail(interaction.guild.iconURL())
                    .setColor("Purple")
                    interaction.reply({ embeds: [klmOff] })
                }
                break;
            }
            case "add" : {
                let { kelimeEngl } = await database.findOne({ guild_id: interaction.guild.id })
                if(!kelimeEngl) return interaction.reply({ content: t("klmEngel.add.nonesetup", {lng: interaction.locale}), ephemeral: true})
                const kelime = interaction.options.getString("word")
                const d = await database.findOne({ guild_id: interaction.guild.id, bKlm: kelime })
                if(d) return interaction.reply({ content: t("klmEngel.add.noneadd", {lng: interaction.locale}), ephemeral: true})
                await database.updateOne({ guild_id: interaction.guild.id}, {$push: {bKlm: kelime}}, {upsert: true})
                interaction.reply({ content: t("klmEngel.add.added", { lng: interaction.locale, word: kelime}), ephemeral: true})
                break;
            }
            case "del" : {
                let { kelimeEngl } = await database.findOne({ guild_id: interaction.guild.id })
                if(!kelimeEngl) return interaction.reply({ content: t("klmEngel.del.nonesetup", {lng: interaction.locale}), ephemeral: true})
                const kelime = interaction.options.getString("word")
                const d = await database.findOne({ guild_id: interaction.guild.id, bKlm: kelime })
                if(!d) return interaction.reply({ content: t("klmEngel.del.nonedel", {lng: interaction.locale}), ephemeral: true})
                await database.updateOne({ guild_id: interaction.guild.id}, {$pull: {bKlm: kelime}}, {upsert: true})
                interaction.reply(`\`${kelime}\` kelimesi, yasaklanan kelimerden silindi`)
                interaction.reply({ content: t("klmEngel.del.del", {lng: interaction.locale, word: kelime}), ephemeral: true})
                break;
            }
            case "filter-list" : {
                let { kelimeEngl } = await database.findOne({ guild_id: interaction.guild.id })
                if(!kelimeEngl) return interaction.reply({ content: t("klmEngel.filter.nonesetup", {lng: interaction.locale}), ephemeral: true})
                const db = await database.findOne({ guild_id: interaction.guild.id })
                const bKlm = db.bKlm || null
                if(!bKlm == null ) return interaction.reply({ content: t("klmEngel.filter.nonefilter", {lng: interaction.locale}), ephemeral: true})
                //if(d.bKlm.length <= 0) return interaction.reply("sistemde kelime yok 2 embed")
                const kelimeler = bKlm.join(", ")
                const KelimeList = new EmbedBuilder()
                .setTitle(t("klmEngel.filter.filterTitle", {lng: interaction.locale}))
                .setDescription(`\`${kelimeler}\``)
                interaction.reply({ embeds: [KelimeList] })
                break;
            }
            case "filter-reset" : {
                let { kelimeEngl } = await database.findOne({ guild_id: interaction.guild.id })
                if(!kelimeEngl) return interaction.reply({ content: t("klmEngel.filter.nonesetup", {lng: interaction.locale}), ephemeral: true})
                await database.updateOne({ guild_id: interaction.guil.id}, {$set: {bKlm: []}}, {upsert: true})
                const resetEmbed = new EmbedBuilder()
                .setTitle(t("klmEngel.filter-reset.title", {lng: interaction.locale}))
                .setDescription(t("klmEngel.filter-reset.description", {lng: interaction.locale}))
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