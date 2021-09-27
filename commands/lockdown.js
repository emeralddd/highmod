const help = {
    name:"lockdown",
    aliases: []
}

const {Message,Permissions} = require('discord.js')

const run = async ({message}) => {
    const exp = ['747714989015564358','698704738279096351','698569781347090502','701607269586174033']
    const allow = ['GUILD_TEXT','GUILD_CATEGORY','GUILD_PUBLIC_THREAD','GUILD_PRIVATE_THREAD']
    const alwaysLock = ['683261991351091217','698627949775028305','698628524793397278','698805250924216360','699056201937453086','699433543344062485','699433718024241152','762172995199827979','772399181750337547','772401753592823828','772401921784414219','786082466216542240','798143928397332490','841116695057924106','844219260326641695','871978636650106940','873928061177966592','891878620807716944']
  //  const message=new Message
    const everyone = message.guild.roles.everyone
    const guildChannel = message.guild.channels.fetch()
        .then(channels => {
            channels.forEach(channel => {

                if(((channel.parent&&!exp.includes(channel.parent.id))||(!channel.parent&&!exp.includes(channel.id)))&&(allow.includes(channel.type))) {
                    if (channel.permissionsFor(everyone).has(Permissions.FLAGS.SEND_MESSAGES)) {
                        channel.permissionOverwrites.edit(everyone, {SEND_MESSAGES: false})
                        message.channel.send("`Đã khóa channel/category: " + channel.name+ "`")
                    }
                }
            })
        })
        .catch(console.error);
}

module.exports.run = run

module.exports.help = help