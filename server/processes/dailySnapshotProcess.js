const database = require("../services/database")
const { triggerDailySnapshot } = require("../services/stockSnapshotService")

/*
* Ensures database is connected
*/
module.exports.processDailySnapshot = async function (data, cb) {
    try {
        await database.connect()
        const result = await triggerDailySnapshot(data)
        await database.disconnect()
        return cb(null, result)
    } catch (error) {
        return cb(error)
    }

}