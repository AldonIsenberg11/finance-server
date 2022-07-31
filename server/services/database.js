const mongoose = require('mongoose')

const handleFailure = (err = "There was an error") => {
    // console.error(`\x1b[36m\x1b[41m\x1b[1m\x1b[5m%s\x1b[0m`, err)
    console.error({err})
    return process.exit(1)
}

module.exports = {

    connect: () => {
        const connection = mongoose.connection

        // mongoose.set('useUnifiedTopology', true) // TODO, do we need this?

        mongoose.connection.on("error", handleFailure)
        mongoose.connection.on("open", () => console.log(`MongoDB connected to[-- ${connection.db.databaseName} --]`))

        if (!process.env.MONGO_CLIENT_CONNECTION) handleFailure("ERROR: No DB connection string found...")

        mongoose.connect(process.env.MONGO_CLIENT_CONNECTION, { useNewUrlParser : true } )
    },

    disconnect: async () => {
        mongoose.connection.on('close', () => console.log("Disconnected from Database"))
        await mongoose.disconnect()
    }

}