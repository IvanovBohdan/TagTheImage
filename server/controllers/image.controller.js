const User = require('../db/models/user.model');
const Image = require('../db/models/image.model');
const Dataset = require('../db/models/dataset.model');
const Area = require('../db/models/area.model');
const sizeOf = require('buffer-image-size');
const path = require('path');
const fs = require('fs');

class ImageController {
    //CRUD image
    async create(req, res) {
        try {
            let body = JSON.parse(req.body.json);
            const user = await User.findById(req.user.id);
            const dataset = await Dataset.findById(body.dataset);
            const files = req.files.file.length ? req.files.file : [req.files.file];
            const dbImages = files.map(async (file, index) => {
                let extention = path.extname(file.name);
                let filename = body.dataset + '-' + Math.floor(Math.random() * 10**7) + extention
                let filePath = path.join(__dirname, '../public/images/' + filename)
                file.mv(filePath);
                let dimentions = sizeOf(file.data);
                let dbImage = new Image()
                let image = {
                    filename: filename,
                    filetype: extention,
                    path: filePath,
                    width: dimentions.width,
                    height: dimentions.height,
                    size: file.size
                }
                dbImage.image = image;
                dbImage.url = 'http://localhost:5001/images/' + filename;
                dbImage.dataset = dataset._id;
                dbImage.user = user._id;
                return await dbImage.save()
            })

            const images = await Promise.all(dbImages);
            const imageIDs = images.map(image => image._id);
            dataset.images = [...dataset.images, ...imageIDs];
            await dataset.save();
            res.status(200).json({
                message: 'Images uploaded successfully',
                images: images
            })

        }catch(e){
            console.log(e);
            return res.status(400).json({ message: 'Image creation error!' });
        }
    }

    async getMany(req, res) {
        try {
            const dataset = await Dataset.findById(req.query.dataset);
            const images = await Image.find({ dataset: dataset._id }).populate('areas').exec()

            res.status(200).json(images)
        }catch(e){
            console.log(e);
            return res.status(400).json({ message: 'Image fetch error!' });
        }
    }

    async update(req, res) {
        try {
            const image = await Image.findById(req.params.id);
            image.title = req.body?.title ?? image.title;
            image.description = req.body?.description ?? image.description;
            image.tags = req.body?.tags ?? image.tags; 
            await image.save();
            res.status(200).json({ message: 'Image updated!' });
        }catch(e){
            console.log(e)
            return res.status(400).json({ message: 'Image update error!' });
        }
    }

    async delete(req, res) {
        try {
            const image = await Image.findOne({_id: req.params.id});
            const dataset = await Dataset.findById(image.dataset);
            const index = dataset.images.indexOf(image._id);
            dataset.images.splice(index, 1);
            await dataset.save();
            fs.unlinkSync(image.image.path);
            await image.remove();

            res.status(200).json({ message: 'Image deleted!' });
        }catch(e){
            console.log(e);
            return res.status(400).json({ message: 'Image delete error!' });
        }
    }
}

module.exports = new ImageController()