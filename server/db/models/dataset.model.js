const db = require("../db");
const Image = require("./image.model");
const Area = require("./area.model");

const schema = new db.Schema({
    name: {
        type: String,
        default: "Untitled",
    },
    description: {
        type: String,
    },
    images: [
        {
            type: db.Schema.Types.ObjectId,
            ref: "Image",
            default: [],
        },
    ],
    tags: [
        {
            type: String,
            default: [],
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    user: {
        type: db.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    public: {
        type: Boolean,
        default: false,
    },
});


module.exports = db.model("Dataset", schema);
