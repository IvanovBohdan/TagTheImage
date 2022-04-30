const db = require('mongoose');
const config = require('../config');

let main = async () => {await db.connect(config.db, {
        useNewUrlParser: true, 
        useUnifiedTopology: true,
        // useCreateIndex: true,
        // useFindAndModify: false
})}

main()

module.exports = db;