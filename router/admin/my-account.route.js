const router = require('express').Router();
const myAccountController = require('../../controllers/admin/myAccount.controller');
router.get('/', myAccountController.index);

module.exports = router;
