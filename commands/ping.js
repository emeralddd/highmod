const help = {
    name:"ping",
    aliases: ["test"]
}
  
const run = async ({message}) => {
    await message.channel.send(`pong`)
}
  
module.exports.run = run
  
module.exports.help = help