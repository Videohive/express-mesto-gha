const router = require('express').Router();
const { getUserById, createUser, getUsers, updateUserInfo } = require('../controllers/users');

router.get('/:userId', getUserById);
router.get('/', getUsers);
router.post('/', createUser);
router.patch('/me', updateUserInfo);

module.exports = router