const router = require("express").Router();

const {
  getUsers,
  findById,
  updateUser,
  updateAvatar,
} = require("../controllers/users");

router.get("/", getUsers);
router.get("/:userId", findById);
router.patch("/me", updateUser);
router.patch("/me/avatar", updateAvatar);

module.exports = router;
