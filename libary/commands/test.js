const send_webhook = require("../discord/send_webhook").main

exports.main = function(data, args) {
    const {author} = data

    send_webhook({
        "title": "Test",

        "fields": [{
            "name": `haii ${author.global_name}!! :3`,
            "value": JSON.stringify(args)
        }]
    })
}