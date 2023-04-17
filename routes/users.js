const router = require('express').Router();
const { getUserById, createUser, getUsers } = require('../controllers/users');

router.get('/:userId', getUserById);
router.post('/', createUser);
router.get('/', getUsers);

module.exports = router