const router = require('express').Router();
const rolesController = require('../../controllers/admin/roles.controller.js');

router.get("/", rolesController.index);
router.get("/create", rolesController.create);
router.post("/create", rolesController.postCreate);
router.get("/edit/:id", rolesController.edit);
router.patch("/edit/:id", rolesController.patchEdit);
router.get("/permission", rolesController.permission);
router.patch("/permission", rolesController.patchPermission);
module.exports = router;