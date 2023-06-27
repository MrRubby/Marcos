import { ActivityType } from "discord.js"
import register_commands from "../utils/Bot/register_commands.js"

export default client => {

    client.once("ready", () => {

        register_commands(client, "guild")

        console.log("Sorunsuz çalışıyor")

        const liste = [
            "Test 1",
            "Test 2",
            "Test 3",
            "Test 4"
        ]

        setInterval(() => {
            const random = Math.floor(Math.random() * liste.length)
            client.user.setPresence({ activities: [{ name: liste[random], type: ActivityType.Watching}]})
        }, 10000)
    })
}