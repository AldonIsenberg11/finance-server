mongoose = require('mongoose')

StockProfileSchema = new mongoose.Schema({
    created : {type: Date, default: Date.now()},
    ticker  : {type: String, required: true},
    name    : {type: String, required: true},
})


StockProfileSchema.set('toJSON', { getters : false }) // output the virtual getters when calling toJSON

// Virtuals ---------------------------------------------------------------------

StockProfileSchema.virtual('formattedName').get(() => {

    return `[${this.ticker}] ${this.name}`
})

module.exports = mongoose.model('stockSnapshot', StockProfileSchema)
module.exports.Schema = StockProfileSchema
