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
        console.log(`Running Program`)

        const snapshot = await retrieveDailySnapshot({ticker: 'IBM'})

        console.log({testSnapshot: snapshot})

        // const requestOpts = {
        //     hostname: 'api.polygon.io',
        //     path: `/v1/open-close/${ticker}/2022-07-29`, // YYYY-MM-DD
        //     method: 'GET',
        //     headers: {
        //         'Accept': 'application/json',
        //         'Authorization': `Bearer ${token}`
        //     }
        // }

        // get(requestOpts, (res) => {
        //     let data = '';
        //     res.on('data', (chunk) => { data += chunk })
        //     res.on('end', () => {
        //         const result = JSON.parse(data)
        //         console.log({ result })
        //         saveDailySnapshot(result, (err) => {
        //             if (err) return disconnect(1)
        //             return disconnect()
        //         })
        //     })
        // }).on("error", (err) => {
        //     console.error("Error: ", inspect(err))
        //     return disconnect(1)
        // })
    })
    .catch((e) => {
        console.error(e)
        return disconnect(1)
    })
}

// async function saveDailySnapshot(data, cb) {
//     const recordAlreadyExists = await Snapshot.findOne({
//         ticker: data.symbol,
//         date: new Date(data.from)
//     })

//     console.log({recordAlreadyExists})

//     if (recordAlreadyExists) {
//         throw new Error("Record already exists")
//     }

//     const snapshot = new Snapshot(data)
    
//     snapshot.date = new Date(data.from)
//     snapshot.ticker = data.symbol

//     await snapshot.save()
//     return cb()
// }

run()
