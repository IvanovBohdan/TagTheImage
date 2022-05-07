const router = require('express').Router();
const ImageController = require('../controllers/image.controller');
const isLoggedIn = require('../middlewares/isLoggedIn.middleware');

router.get('/', isLoggedIn, ImageController.getMany);
router.post('/', isLoggedIn, ImageController.create);
router.put('/:id', isLoggedIn, ImageController.update);
router.delete('/:id', isLoggedIn, ImageController.delete);

module.exports = router