const User = require("../db/models/user.model");
const Dataset = require("../db/models/dataset.model");
const Image = require("../db/models/image.model");
const Area = require("../db/models/area.model");

class DatasetController {
    //CRUD dataset
    async create(req, res) {
        try {
            const user = await User.findById(req.user.id);
            req.body.name = req.body.name || "Untitled" + Date.now();
            const dataset = new Dataset({
                name: req.body.name,
                description: req.body.description,
                tags: req.body.tags,
                user: user._id,
            });

            await dataset.save();
            return res.json({ message: "Dataset created!" });
        } catch (e) {
            console.log(e);
            return res.status(400).json({ message: "Dataset creation error!" });
        }
    }

    async getAll(req, res) {
        try {
            const datasets = await Dataset.find({ user: req.user.id });

            return res.json(datasets);
        } catch (e) {
            console.log(e);
            return res.status(400).json({ message: "Dataset get error!" });
        }
    }

    async getOne(req, res) {
        try {
            const dataset = await Dataset.findById(req.params.id);
            return res.json(dataset);
        } catch (e) {
            return res.status(400).json({ message: "Dataset get error!" });
        }
    }

    async update(req, res) {
        try {
            const dataset = await Dataset.findById(req.params.id);
            await Dataset.findByIdAndUpdate(req.params.id, req.body);
            return res.json({ message: "Dataset updated!" });
        } catch (e) {
            return res.status(400).json({ message: "Dataset update error!" });
        }
    }

    async delete(req, res) {
        try {
            const dataset = await Dataset.findById(req.params.id);
            await dataset.remove();
            return res.json({ message: "Dataset deleted!" });
        } catch (e) {
            return res.status(400).json({ message: "Dataset delete error!" });
        }
    }

    async exportDataset(req, res) {
        try {
            const dataset = await Dataset.findById(req.params.id);
            const images = await Image.find({ dataset: dataset._id });
            const areas = await Area.find({ dataset: dataset._id });
            dataset.images = images;
            dataset.images.areas = areas;

            res.json(dataset);
        } catch (e) {
            console.log(e);
            return res.status(400).json({ message: "Dataset export error!" });
        }
    }
}

module.exports = new DatasetController();
