const {Router} = require('express');
const userController = require('../controllers/user.controller');
const isLoggedIn = require('../middlewares/isLoggedIn.middleware');
const router = new Router();

router.get('/', (req, res) => {
    res.send('Hello User!')
})

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/test', isLoggedIn, userController.test);

module.exports = router;