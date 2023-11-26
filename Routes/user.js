const router = require('express').Router();
const userController = require('../Controller/userController');

router.get('/', userController.getUsers);
router.post('/', userController.postUser);
router.delete('/:email', userController.deleteUser);

module.exports = router;
