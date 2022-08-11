const stockService = require('../services/stockSnapshotService')
const wrap = require('./helpers/asyncWrapper')


exports.getBreakdown = wrap(async(req, res) => {
  console.log("getStockBreakdown-Handler")

  const result = await stockService.getBreakdown(req.query) || `No result found for query: ${req.query}`

  console.log({ result });

  res.status(200).json(result).end()
})