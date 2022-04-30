const db = require('../db');
const schema = new db.Schema({
    type: {
        type: String,
        required: true,
        unique: true
    },
    label: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    data: {
        type: Object,
    },
    tags: [{
        type: String,
    }],
    image: {
        type: db.Schema.Types.ObjectId,
        ref: 'Image'
    },
    user: {
        type: db.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }

})

module.exports = db.model('Area', schema);