const dotenv = require("dotenv").config()
const config = require("../../config.json")
const file_system = require("fs")

const discord_id = parseInt(process.env.discord_id)

exports.saved_messages = {}

exports.main = function(data) {
    const {author, id, content} = data
    const author_id = parseInt(author.id)

    const stored_data = {
        ["author"]: {
            ["global_name"]: author.global_name,
            ["username"]: author.username,
            ["id"]: author.id
        },
        
        ["content"]: content,
        ["id"]: id,
        ["channel_id"]: data.channel_id
    }

    const isSelf = (author_id === discord_id)
    const hasCommandAccess = (config.command_access.includes(author_id))

    if (isSelf || hasCommandAccess) {
        if (content.startsWith(config.prefix)) {
            const split_string = content.split(" ")
            const command = split_string[0].substring(1, split_string[0].length).toLowerCase()

            split_string.shift()
           
            if (file_system.existsSync(`./libary/commands/${command}.js`)) {
                require(`../commands/${command}.js`).main(stored_data, split_string)
            }
        }

        return
    }

    exports.saved_messages[id] = stored_data
}