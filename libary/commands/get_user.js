const dotenv = require("dotenv").config()
const send_message = require("../discord/send_message").main

const discord_token = process.env.discord_token

exports.main = async function(data, args) {
    const {channel_id} = data
    const user_id = args[0]
    const url = `https://discord.com/api/v10/users/${user_id}/profile`

    const response = await fetch(url, {
        method: "GET",
        headers: {"Authorization": discord_token}
    })

    .catch(error => console.log(error))

    if (response.ok) {
        const response_data = await response.json()
        const {user, badges} = response_data
        const badge_content = []

        for (let index in badges) {
            const badge = badges[index]

            badge_content[index] = badge.description
        }

        send_message({
            "channel_id": channel_id,
            "content":
`
${"```diff"}
! [System] - get_user

Display Name: ${user.global_name}
Username: ${user.username}
ID: ${user.id}

// Badges:
${JSON.stringify(badge_content)}

// Bio:
${user.bio}
${"```"}
[- Avatar -](https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.webp?size=128)
[- Banner -](https://cdn.discordapp.com/banners/${user.id}/${user.banner}.png?size=600)
`
        })
    }
}