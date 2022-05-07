const db = require("../db");
const schema = new db.Schema({
    type: {
        type: String,
        required: true,
    },
    label: {
        type: String,
    },
    description: {
        type: String,
    },
    data: {
        type: Object,
        required: true,
    },
    tags: [
        {
            type: String,
        },
    ],
    image: {
        type: db.Schema.Types.ObjectId,
        ref: "Image",
        required: true,
    },
    dataset: {
        type: db.Schema.Types.ObjectId,
        ref: "Dataset",
        required: true,
    },
    user: {
        type: db.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
});

module.exports = db.model("Area", schema);
