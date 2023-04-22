const router = require("express").Router();

const {
  getUsers,
  findById,
  updateUser,
  updateAvatar,
  getUser,
} = require("../controllers/users");

router.get("/", getUsers);
router.get("/me", getUser);
router.get("/:userId", findById);
router.patch("/me", updateUser);
router.patch("/me/avatar", updateAvatar);

module.exports = router;
