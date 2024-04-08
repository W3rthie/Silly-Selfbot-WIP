const log_channel = require("../../config.json").log_channel
const saved_messages = require("./MESSAGE_CREATE").saved_messages
const send_message = require("../discord/send_message").main

exports.main = function(data) {
    const {id} = data
    const message_data = saved_messages[id]

    if (message_data) {
        const {author, content, channel_id} = message_data

        send_message({
            "channel_id": log_channel,
            "content": 
`
${"```diff"}
! [System] - Deleted Message

Display Name: ${author.global_name}
Username: ${author.username}
User ID: ${author.id}

Message ID: ${id}
Channel ID: ${channel_id}

// Message Content:
${content}
${"```"}
`
        })
    }
}
