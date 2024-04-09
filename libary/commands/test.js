const send_message = require("../discord/send_message").main

exports.main = function(data, args) {
    const {channel_id} = data

    send_message({
        "channel_id": channel_id,
        "content": 
`
${"```diff"}
! [System] - test

huh :3
${"```"}
`
    })
}