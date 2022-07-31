mongoose = require('mongoose')

StockSnapshotSchema = new mongoose.Schema({
    created  : {type: Date, default: Date.now()},
    date     : {type: Date, required: true},
    ticker   : {type: String, required: true},
    // name     : {type: String, required: true},
    // from: '2022-07-29',
    // symbol: 'IBM',
    open       : Number,
    high       : Number,
    low        : Number,
    close      : Number,
    volume     : Number,
    afterHours : Number,
    preMarket  : Number,
})


StockSnapshotSchema.set('toJSON', { getters : false }) // output the virtual getters when calling toJSON

// Virtuals ---------------------------------------------------------------------

StockSnapshotSchema.virtual('formattedName').get(() => {
    return `[${this.ticker}] ${this.name || this.date}`
})


module.exports = mongoose.model('stockSnapshot', StockSnapshotSchema)
module.exports.Schema = StockSnapshotSchema
