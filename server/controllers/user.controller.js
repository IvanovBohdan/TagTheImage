const User = require('../db/models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config');

const generateToken = (id, roles) => {
    return jwt.sign({ id, roles }, config.jwtSecret, { expiresIn: '24h' });
}

class UserController{
    async register(req, res){
        try{

            let user = await User.findOne({username: req.body.username})

            if(!user){
                let newUser = new User({
                    username: req.body.username,
                    password: bcrypt.hashSync(req.body.password, 7)
                })
                await newUser.save()
                res.json({message: 'User registered!'})
            }else{
                res.status(400).json({message: 'User already exists!'})
            }

        }catch(e){
            res.status(400).json({message: "Registration error!"})
        }
    }

    async login(req, res){  
        try{   
            let user = await User.findOne({username: req.body.username})
            if(!user){
                res.status(404).json({message: 'User not found!'})
            }
            else if(bcrypt.compareSync(req.body.password, user.password)){
                let token = 'Bearer ' + generateToken(user._id, user.roles)
                res.json({message: 'User logged in!', token})
            }
            else{
                res.status(400).json({message: 'Wrong password!'})
            }
        }catch(e){
            res.status(400).json({message: 'Login error!'})
        }
    }

    async test(req, res){
        res.json({message: 'Test'})
    }
}

module.exports = new UserController()