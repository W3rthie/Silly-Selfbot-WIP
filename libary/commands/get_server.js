const dotenv = require("dotenv").config()
const send_message = require("../discord/send_message").main

const discord_token = process.env.discord_token

exports.main = async function(data, args) {
    const {channel_id} = data
    const guild_id = args[0]
    const url = `https://discord.com/api/v10/guilds/${guild_id}`

    const response = await fetch(url, {
        method: "GET",
        headers: {"Authorization": discord_token}
    })

    .catch(error => console.log(error))

    if (response.ok) {
        const response_data = await response.json()

        send_message({
            ["channel_id"]: channel_id,
            ["content"]:
`
${"```diff"}
! [System] - get_server

Name: ${response_data.name}
ID: ${response_data.id}
Owner ID: ${response_data.owner_id}

// Description:
${response_data.description}

// Features:
${JSON.stringify(response_data.features)}
${"```"}
[- Icon -](https://cdn.discordapp.com/icons/${guild_id}/${response_data.icon}.webp?size=96)
[- Banner -](https://cdn.discordapp.com/banners/${guild_id}/${response_data.banner}.webp?size=240)
[- Invite -](https://discord.gg/${response_data.vanity_url_code || ""})
`
        })
    }
}