const dotenv = require("dotenv").config()
const web_socket = require("ws")
const file_system = require("fs")

const socket = new web_socket("wss://gateway.discord.gg/?v=10&encoding=json")

let token = process.env.discord_token
let interval = 0

let payload = {
    op: 2,
    d: {
        token: token,
        properties: {
            $os: "linux",
            $browser: "chrome",
            $device: "chrome"
        }
    }
}

function onHeartbeat(heartbeat_interval) {
    return setInterval(function() {
        socket.send(JSON.stringify({op: 1, d: null}))
    }, heartbeat_interval)
}

function onMessage(data) {
    let payload = JSON.parse(data)
    const {t, op, d} = payload
    const eventPath = `./libary/events/${t}.js`

    switch(op) {
        case 10:
            const {heartbeat_interval} = d
            interval = onHeartbeat(heartbeat_interval)

            break
    }

    if (file_system.existsSync(eventPath)) {
        require(eventPath).main(d)
    }
}

function onOpen() {
    socket.send(JSON.stringify(payload))
}

socket.on("open", onOpen)
socket.on("message", onMessage)