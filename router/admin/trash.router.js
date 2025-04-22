const router = require('express').Router();
const trashController = require('../../controllers/admin/trash.controller.js');
router.get("/",trashController.index);
router.delete("/delete/:id",trashController.deleted);
router.patch("/restore/:id",trashController.restore);
module.exports = router;