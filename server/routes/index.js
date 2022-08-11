const express = require('express')
const stockBreakdown = require('../httpHandlers/stockBreakdown')

const router = express.Router()

router.use(express.json())
// router.use(express.urlencoded({extended: true}))

router.get('/stockBreakdown', stockBreakdown.getBreakdown)
// router.post('/addWrestlingEvent', stockBreakdown.addWrestlingEvent)
// router.get('/allEvents', event.allEvents)

module.exports = router