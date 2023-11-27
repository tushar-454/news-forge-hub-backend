const router = require('express').Router();
const userController = require('../Controller/userController');
const verifyUser = require('../Middleware/verifyUser');

router.get('/', verifyUser, userController.getUsers);
router.post('/', userController.postUser);
router.delete('/:email', verifyUser, userController.deleteUser);

module.exports = router;
