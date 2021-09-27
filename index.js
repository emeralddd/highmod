const { Collection, Client, Intents, Permissions} = require('discord.js')
const fs = require('fs')
require('dotenv').config()

const bot = new Client({intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS]})

let commandsList = new Collection()
let aliasesList = new Collection()

const addCommand = () => {
    fs.readdir('./commands/', (error, files) => {
        if(error) {
            console.error(error.message)
        }
        const jsfile = files.filter(file => file.split('.').pop() === 'js')
        if(jsfile.length === 0) {
            console.error('Chua lenh nao duoc add!')
        }
        jsfile.forEach((file,index) => {
            const module = require(`./commands/${file}`)

            if(module.help) {
                console.log(`${file} da duoc add!`)

                commandsList.set(module.help.name,module)

                module.help.aliases.forEach(alias => {
                    aliasesList.set(alias,module.help.name)
                })
            }
        })
    })
}

const initial = async () => {
    try {
        addCommand()
    } catch (error) {
        console.error(error.message)
    }
}

initial()

bot.once('ready', () => {
    bot.user.setActivity('HIGH MOD COMMANDS', {type:'PLAYING'});
    console.log(`Da dang nhap duoi ten ${bot.user.tag}!`)
})

bot.on('messageCreate', async (message) => {
    const msg= message.content

    if(message.channel.type === "dm") return
    if(message.author.bot) return

    const prefix = process.env.PREFIX

    if(!msg.toLowerCase().startsWith(prefix)) return
    
    const perm = message.member.permissions
    if(!(perm.has(Permissions.FLAGS.ADMINISTRATOR)||perm.has(Permissions.FLAGS.MANAGE_GUILD))) {
        return
    }
    
   // console.log(`qua day`)
    const S = msg.substr(prefix.length).split(' ')
	let args = []

	for (const i of S) {
        if(i != '') args.push(i)
    }

    let cmd = args[0].toLowerCase()
    //console.log(cmd)
    if(aliasesList.has(cmd)) {
        cmd=aliasesList.get(cmd)
    }

    if (commandsList.has(cmd)) {
        //console.log(`abc`)
        const command = commandsList.get(cmd)
        //console.log(command)
        try {
            command.run({
                bot,
                message,
                args,
                aliasesList
            })
        } catch (error) {
            
        }
    }
})

bot.login(process.env.TOKEN)