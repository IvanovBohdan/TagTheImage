const router = require("express").Router();
const isLoggedIn = require("../middlewares/isLoggedIn.middleware");
const AreaController = require("../controllers/area.controller");

router.get("/:id", isLoggedIn, AreaController.getAll); // GET /api/area
router.post("/", isLoggedIn, AreaController.createMany); // POST /api/area
router.put("/:id", isLoggedIn, AreaController.update); // PUT /api/area/:id
router.delete("/:id", isLoggedIn, AreaController.delete); // DELETE /api/area/:id

module.exports = router;
