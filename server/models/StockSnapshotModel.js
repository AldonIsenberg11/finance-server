mongoose = require('mongoose')

StockSnapshotSchema = new mongoose.Schema({
    created  : {type: Date, default: Date.now()},
    date     : {type: Date, required: true},
    ticker   : {type: String, required: true},
    name     : {type: String, required: true},
})


StockSnapshotSchema.set('toJSON', { getters : false }) // output the virtual getters when calling toJSON

// Virtuals ---------------------------------------------------------------------

StockSnapshotSchema.virtual('formattedName').get(() => {

    return `[${this.ticker}] ${this.name}`
})

module.exports = mongoose.model('stockSnapshot', StockSnapshotSchema)
module.exports.Schema = StockSnapshotSchema
