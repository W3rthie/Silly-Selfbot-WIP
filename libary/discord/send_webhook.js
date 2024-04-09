const config = require("../../config.json")

const {log_webhook} = config

exports.main = function(data) {
    const {title, fields} = data

    fetch(log_webhook, {
        method: "POST",
        headers: {"Content-Type": "application/json"},

        body: JSON.stringify({
            embeds: [{
                title: title,
                description: "/ - / - / - / - / - / - / - / - / - / - / - / - / - /",
                fields: fields,
                color: 16559103
            }]
        })
    })

    .catch(error => console.log(error))
}