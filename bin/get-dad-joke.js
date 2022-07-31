const { get } = require('https')
const { inspect } = require('util')
const database = require('../server/services/database')

function disconnect(exitStatus = 0) {
  Promise.all([database.disconnect()])
    .then(() => {
        process.exit(exitStatus)
    })
    .catch((e) => {
        console.error("Error Shutting disconnecting: ", e)
        process.exit(1)
    })
}

function run() {
  Promise.all([database.connect()])
    .then(async () => {
        console.log(`Running Program`)

        const requestOpts = {
            hostname: 'icanhazdadjoke.com',
            path: '/',
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            }
        }

        get(requestOpts, (res) => {
            let data = '';

            res.on('data', (chunk) => { data += chunk }) // called when a data chunk is received.

            res.on('end', () => { console.log(JSON.parse(data)) }) // called when the complete response is received.

        }).on("error", (err) => {
            console.error("Error: ", inspect(err))
        })
        
        return disconnect()
    })
    .catch((e) => {
        console.error(e)
        return disconnect(1)
    })
}

run()
