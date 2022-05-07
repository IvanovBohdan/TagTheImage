const DatasetController = require("../controllers/dataset.controller");
const router = require("express").Router();
const isLoggedIn = require("../middlewares/isLoggedIn.middleware");

router.get("/", isLoggedIn, DatasetController.getAll);
router.get("/:id", isLoggedIn, DatasetController.getOne);
router.get("/export/:id", isLoggedIn, DatasetController.exportDataset);
router.post("/", isLoggedIn, DatasetController.create);
router.put("/:id", isLoggedIn, DatasetController.update);
router.delete("/:id", isLoggedIn, DatasetController.delete);

module.exports = router;
