const { get } = require('https')
const { inspect } = require('util')
const database = require('../server/services/database')
const Snapshot = require('../server/models/StockSnapshotModel')
const { saveDailySnapshot, retrieveDailySnapshot } = require('../server/services/stockSnapshotService')

// const token = process.env.POLYGON_API_KEY || '65IG2fDiID7Jf4pXlOmjk6RNIjo6oFsV'
const ticker = 'IBM'

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
        const snapshot = await retrieveDailySnapshot({ticker: 'IBM'})

        console.log({testSnapshot: snapshot})
        return disconnect()

    })
    .catch((e) => {
        console.error(e)
        return disconnect(1)
    })
}

run()
