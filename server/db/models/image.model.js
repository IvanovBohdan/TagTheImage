const db = require('../db');

const imageData = new db.Schema({
    filename: {
        type: String,
        required: true,
        unique: true
    },
    filetype: {
        type: String,
    },
    path: {
        type: String,
        required: true
    },
    width: {
        type: Number,
        required: true
    },
    height: {
        type: Number,
        required: true
    },
    size: Number
})

const schema = new db.Schema({
    image: {
        type: imageData,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    dataset: {
        type: db.Schema.Types.ObjectId,
        ref: 'Dataset'
    },
    description: {
        type: String,
        required: true
    },
    areas: [{
        type: db.Schema.Types.ObjectId,
        ref: 'Area'
    }],
    tags: [{
        type: String,
        default: []
    }],
    user: {
        type: db.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})

module.exports = db.model('Image', schema);