const program = require('commander');
const { processDailySnapshot } = require('./server/processes/dailySnapShotProcess');

program
    .version('1.0.0')
    .description('Finance Management System')

program
    .command('get <stockTicker>') // CLI Command: `node ./commander.js find IBM`
    .alias('g')
    .description('Get a stock ticker')
    .action((stockTicker) => {
        console.log({stockTicker})
    })

program
    .command('add <stockTicker>') // CLI Command: `node ./commander.js find IBM`
    .alias('a')
    .description('Add a stock snapshot')
    .requiredOption('-d, --date <date>', 'date required')
    .action((ticker, {date}) => {
        console.log({ticker, date})
        
        if (!ticker) {
            console.error("must provide stock ticker")
            throw new Error("must provide stock ticker")
        }

        processDailySnapshot({ticker, date}, (err, result) => {
            console.log({err, result})
            if (err) throw new Error(err)
            process.exit()
        })
    })

program.parse(process.argv)