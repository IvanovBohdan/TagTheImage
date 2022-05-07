const db = require("../db");

const imageData = new db.Schema({
    filename: {
        type: String,
        required: true,
        unique: true,
    },
    filetype: {
        type: String,
    },
    path: {
        type: String,
        required: true,
    },
    width: {
        type: Number,
    },
    height: {
        type: Number,
    },
    size: Number,
});

const schema = new db.Schema({
    image: {
        type: imageData,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
    dataset: {
        type: db.Schema.Types.ObjectId,
        ref: "Dataset",
        required: true,
    },
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    areas: [
        {
            type: db.Schema.Types.ObjectId,
            ref: "Area",
        },
    ],
    tags: [
        {
            type: String,
            default: [],
        },
    ],
    user: {
        type: db.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
});

module.exports = db.model("Image", schema);
