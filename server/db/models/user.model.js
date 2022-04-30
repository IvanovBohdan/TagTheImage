const db = require('../db');
const schema = new db.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    roles: {
        type: Array,
        default: ['user']
    },
    datasets: [{
        type: db.Schema.Types.ObjectId,
        ref: 'Dataset'
    }]
})

module.exports = db.model('User', schema);