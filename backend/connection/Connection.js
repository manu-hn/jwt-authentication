const { connect } = require('mongoose')

connect(process.env.DATABASE_URL).then(() => {
    console.log("connected to database")
}).catch((error) => {
    console.log(error)
})