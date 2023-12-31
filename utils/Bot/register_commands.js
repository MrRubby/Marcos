export default (client, type = "global") => {

    const commands = client.commands.map(command => command.slash_data)
    
    if(type == "global") {
        client.application.commands.set(commands)
        .then(() => {
            console.log("Global commands have been saved!")
        })
    }
    else if(type == "guild") {
        const guild = client.guilds.cache.get("1043269357838532723")
        guild.commands.set(commands)
        .then(() => {
            console.log("Guild commands have been saved!")
        })
    }

}