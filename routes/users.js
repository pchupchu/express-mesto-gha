const router = require('express').Router();
const {
  validationUpdateUser,
  validationUpdateAvatar,
  validationUserId,
} = require('../utils/validation');

const {
  getUsers,
  findById,
  updateUser,
  updateAvatar,
  getUser,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/me', getUser);
router.get('/:userId', validationUserId, findById);
router.patch('/me', validationUpdateUser, updateUser);
router.patch('/me/avatar', validationUpdateAvatar, updateAvatar);

module.exports = router;
