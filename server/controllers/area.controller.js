const Area = require("../db/models/area.model");
const Image = require("../db/models/image.model");

class AreaController {
    async create(req, res) {
        try {
            const image = await Image.findById(req.body.image);
            const area = new Area({
                type: req.body.type,
                label: req.body.label || "",
                data: req.body.data,
                tags: req.body.tags || [],
                image: req.body.image,
                dataset: req.body.dataset || image.dataset,
                description: req.body.description || "",
                user: req.user.id,
            });
            await area.save();
            image.areas.push(area._id);
            await image.save();
            res.status(200).json(area);
        } catch (e) {
            console.log(e);
            res.status(400).json({
                message: "Error creating area!",
            });
        }
    }

    async createMany(req, res) {
        try {
            let body = req.body.filter((area) => !area._id);
            await Promise.all(
                req.body.map(async (area) => {
                    const image = await Image.findById(area.image);
                    const newArea = new Area({
                        type: area.type,
                        label: area.label || "",
                        data: area.data,
                        tags: area.tags || [],
                        image: area.image,
                        dataset: area?.dataset || image?.dataset,
                        description: area.description || "",
                        user: req.user.id,
                    });
                    await newArea.save();
                    image.areas.push(newArea._id);
                    image.save();
                })
            );
            res.status(200).json({
                message: "Areas created!",
            });
        } catch (e) {
            console.log(e);
            res.status(400).json({
                message: "Error creating areas!",
            });
        }
    }

    async getAll(req, res) {
        try {
            const areas = await Area.find({ image: req.params.id });
            res.status(200).json(areas);
        } catch (e) {
            console.log(e);
            res.status(400).json({
                message: "Error getting areas!",
            });
        }
    }

    async update(req, res) {
        try {
            const area = await Area.findById(req.params.id);
            area.type = req.body.type;
            area.label = req.body.label;
            area.data = req.body.data;
            area.tags = req.body.tags;
            area.image = req.body.image;
            area.dataset = req.body.dataset;
            area.description = req.body.description;
            area.user = req.user._id;
            await area.save();
            res.status(200).json(area);
        } catch (e) {
            console.log(e);
            res.status(400).json({
                message: "Error updating area!",
            });
        }
    }

    async delete(req, res) {
        try {
            const area = await Area.findByIdAndDelete(req.params.id);
            const image = await Image.findById(area.image);
            image.areas = image.areas.filter(
                (area) => area._id.toString() !== req.params.id
            );
            await image.save();
            res.status(200).json({
                message: "Area deleted!",
            });
        } catch (e) {
            console.log(e);
            res.status(400).json({
                message: "Error deleting area!",
            });
        }
    }
}

module.exports = new AreaController();
