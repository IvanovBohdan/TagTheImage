const User = require('../db/models/user.model');
const Dataset = require('../db/models/dataset.model');
const Image = require('../db/models/image.model');
const Area = require('../db/models/area.model');
const config = require('../config');

class DatasetController {
    //CRUD dataset
    async create(req, res) {
        try {
            const user = await User.findById(req.user.id);
     
            const dataset = new Dataset({...req.body, user: user._id});
            
            await dataset.save();
            return res.json({ message: 'Dataset created!' });
        } catch (e) {
            console.log(e)
            return res.status(400).json({ message: 'Dataset creation error!' });
        } 
    }

    async getAll(req, res) {
        try {

            const datasets = await Dataset.find({user: req.user.id});
          
            return res.json(datasets);
        } catch (e) {
            console.log(e)
            return res.status(400).json({ message: 'Dataset get error!' });
        }
    }

    async getOne(req, res) {
        
        try {
            const dataset = await Dataset.findById(req.params.id);
            if(dataset.user != req.user.id || dataset.public || req.user.roles.includes('admin')) {
                return res.status(403).json({ message: 'Forbidden!' });
            }
            return res.json(dataset);
        }catch(e){
            return res.status(400).json({ message: 'Dataset get error!' });
        }
    }

    async update(req, res) {
        try{
            const dataset = await Dataset.findById(req.params.id);
            if(dataset.user != req.user.id || dataset.public || req.user.roles.includes('admin')) {
                return res.status(403).json({ message: 'Forbidden!' });
            }
            await Dataset.findByIdAndUpdate(req.params.id, req.body);
            return res.json({ message: 'Dataset updated!' });
        }catch(e){
            return res.status(400).json({ message: 'Dataset update error!' });
        }
    }

    async delete(req, res) {
        try{
            const dataset = await Dataset.findById(req.params.id);
            if(dataset.user != req.user.id || dataset.public || req.user.roles.includes('admin')) {
                return res.status(403).json({ message: 'Forbidden!' });
            }
            await Dataset.findByIdAndDelete(req.params.id);
            return res.json({ message: 'Dataset deleted!' });
        }catch(e){
            return res.status(400).json({ message: 'Dataset delete error!' });
        }
    }
    
}

module.exports = new DatasetController()