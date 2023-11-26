const router = require('express').Router();
const userController = require('../Controller/userController');

router.get('/', userController.getUsers);
router.post('/', userController.postUser);
router.patch('/:email', userController.patchUser);
router.delete('/:email', userController.deleteUser);

module.exports = router;
