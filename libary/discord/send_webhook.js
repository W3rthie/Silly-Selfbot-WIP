const config = require("../../config.json")

const {discord_webhook} = config

exports.main = function(data) {
    const {title, fields} = data

    fetch(discord_webhook, {
        method: "POST",
        headers: {"Content-Type": "application/json"},

        body: JSON.stringify({
            embeds: [{
                title: title,
                description: "/ - / - / - / - / - / - / - / - / - / - /",
                fields: fields
            }]
        })
    })

    .catch(function(error) {
        console.log(error)
    })
}