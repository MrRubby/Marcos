import { EmbedBuilder } from "discord.js";

export default (description, color = "#ffa954", title = "") => {

    if (color == "RED") color = "#ff0000"
    else if (color == "GREEN") color = "#00ff4b"
    else if (color == "INFO") color = "#0019ff"

    const response = new EmbedBuilder()
    .setDescription(description)
    .setColor(color)
    .setTitle(title)

    return response

} 