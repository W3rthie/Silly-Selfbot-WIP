const dotenv = require("dotenv").config()

const discord_token = process.env.discord_token

exports.main = function(data) {
    const {channel_id, content} = data
    const url = `https://discord.com/api/v10/channels/${channel_id}/messages`

    fetch(url, {
        method: "POST",

        headers: {
            "Authorization": discord_token,
            "Content-Type": "application/json"
        },
    
        body: JSON.stringify({"content": content})
    })

    .catch(error => console.log(error))
}