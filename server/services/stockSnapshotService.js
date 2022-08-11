// import { get } from "https"
// import { inspect } from "util"

const Snapshot = require('../models/StockSnapshotModel')

const { get } = require('https')
const { inspect } = require('util')

module.exports.saveDailySnapshot =  async function (data, cb) {
    const recordAlreadyExists = await Snapshot.findOne({
        ticker: data.symbol,
        date: new Date(data.from)
    })

    console.log({recordAlreadyExists})

    if (recordAlreadyExists) {
        throw new Error("Record already exists")
    }

    const snapshot = new Snapshot(data)
    
    snapshot.date = new Date(data.from)
    snapshot.ticker = data.symbol

    await snapshot.save()
    return cb()
}

module.exports.retrieveDailySnapshot =  async function (opts = {}, cb) {
    const token = process.env.POLYGON_API_KEY || '65IG2fDiID7Jf4pXlOmjk6RNIjo6oFsV'
    const { ticker, date } = opts

    if (!ticker) {
        throw new Error("Must enter ticker")
    }

    if (!date) {
        console.log("No date")
    }

    const requestOpts = {
        hostname: 'api.polygon.io',
        path: `/v1/open-close/${ticker}/2022-07-29`, // YYYY-MM-DD
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }

    get(requestOpts, (res) => {
        let data = '';
        res.on('data', (chunk) => { data += chunk })
        res.on('end', () => {
            const result = JSON.parse(data)
            console.log({ result })
            return result
            // saveDailySnapshot(result, (err) => {

            //     // if (err) return disconnect(1)
            //     // return disconnect()
            // })
        })
    }).on("error", (err) => {
        console.error("Error: ", inspect(err))
        // return disconnect(1)
    })
}

module.exports.getBreakdown = async function (opts = {}) {
    console.log("getBreakdown.opts", opts)
    const stockData = await Snapshot.find();

    console.log({stockData})
    return stockData
}

// export async function daveDailySnapshot(data, cb) {
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

// export async function retrieveDailySnapshot(opts = {}) {
//     const { ticker, date } = opts

//     if (!ticker) {
//         throw new Error("Must enter ticker")
//     }

//     if (!date) {
//         console.log("No date")
//     }

//     const requestOpts = {
//         hostname: 'api.polygon.io',
//         path: `/v1/open-close/${ticker}/2022-07-29`, // YYYY-MM-DD
//         method: 'GET',
//         headers: {
//             'Accept': 'application/json',
//             'Authorization': `Bearer ${token}`
//         }
//     }

//     get(requestOpts, (res) => {
//         let data = '';
//         res.on('data', (chunk) => { data += chunk })
//         res.on('end', () => {
//             const result = JSON.parse(data)
//             console.log({ result })
//             return result
//             // saveDailySnapshot(result, (err) => {

//             //     // if (err) return disconnect(1)
//             //     // return disconnect()
//             // })
//         })
//     }).on("error", (err) => {
//         console.error("Error: ", inspect(err))
//         return disconnect(1)
//     })
// }