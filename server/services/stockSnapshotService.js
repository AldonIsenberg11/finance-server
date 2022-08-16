// import { get } from "https"
// import { inspect } from "util"
const axios = require('axios')
const Snapshot = require('../models/StockSnapshotModel')

const { get } = require('https')
const { inspect } = require('util')

/*
* Service to find and or retrieve results
*/
module.exports.triggerDailySnapshot = async function (data) {

    const {date, ticker} = data
    // return cb()
    const recordAlreadyExists = await Snapshot.findOne({
        ticker: data.ticker,
        date: new Date(data.date)
    })

    console.log({recordAlreadyExists})

    if (recordAlreadyExists) {
        console.warn("Record already exists")
        console.table(recordAlreadyExists)
        throw new Error('Record Already exists')
    }
    
    const url = `https://api.polygon.io/v1/open-close/${ticker}/${date}`
    const token = process.env.POLYGON_API_KEY
    const headers = { 'Accept': 'application/json', 'Authorization': `Bearer ${token}`}

    const result = await axios.get(url, { headers } )

    if (!result) throw new Error(`no snapshot found from upstream provider: ${url}`)
    console.log("triggerDailySnapshot: ", result.data)

    const snapshot = new Snapshot(result.data)

    snapshot.date = new Date(data.date)
    snapshot.ticker = data.ticker

    console.log({snapshot})

    await snapshot.save()
    return snapshot
}

module.exports.getBreakdown = async function (opts = {}, v2) {
    console.log("getBreakdown.opts", {opts, v2})
    const stockData = await Snapshot.find();

    console.log({stockData})
    return stockData
}

// module.exports.saveDailySnapshot =  async function (data, cb) {
//     const recordAlreadyExists = await Snapshot.findOne({
//         ticker: data.symbol,
//         date: new Date(data.from)
//     })

//     console.log({recordAlreadyExists})

//     if (recordAlreadyExists) {
//         console.warn("Record already exists")
//         console.table(recordAlreadyExists)
//         return
//     }

//     const snapshot = new Snapshot(data)
    
//     snapshot.date = new Date(data.from)
//     snapshot.ticker = data.symbol

//     await snapshot.save()
//     return cb()
// }

// const retrieveDailySnapshot = async function (opts = {}, cb) {
//     const token = process.env.POLYGON_API_KEY || '65IG2fDiID7Jf4pXlOmjk6RNIjo6oFsV'
//     const { ticker, date } = opts

//     if (!ticker) throw new Error("Must enter ticker")

//     const formattedDate = date || '2022-07-29'

//     const requestOpts = {
//         hostname: 'api.polygon.io',
//         path: `/v1/open-close/${ticker}/${formattedDate}`, // YYYY-MM-DD
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
//         })
//     }).on("error", (err) => {
//         console.error("Error: ", inspect(err))
//     })
// }
