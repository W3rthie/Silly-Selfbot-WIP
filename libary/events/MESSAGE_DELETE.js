const saved_messages = require("./MESSAGE_CREATE").saved_messages
const send_webhook = require("../discord/send_webhook").main

exports.main = function(data) {
    const {id} = data
    const message_data = saved_messages[id]

    if (message_data) {
        const {author, content, channel_id} = message_data

        send_webhook({
            "title": "! [System] - Message Deleted",
            "fields": [{
                "name": " ",
                "value":
                `
                Display Name: ${author.global_name}
                Username: ${author.username}
                User ID: ${author.id}
                
                Message ID: ${id}
                Channel ID: ${channel_id}
                
                // Message Content:
                ${content}
                `
            }]
        })
    }
}