const saved_messages = require("./MESSAGE_CREATE").saved_messages

exports.main = function(data) {
    const {id} = data
    const message_data = saved_messages[id]

    if (message_data) {
        console.log("Deleted message: ", message_data)
    }
}