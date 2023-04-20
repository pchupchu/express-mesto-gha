const router = require("express").Router();

const {
  getUsers,
  findById,
  updateUser,
  updateAvatar,
  // getUser,
} = require("../controllers/users");

router.get("/", getUsers);
router.get("/:userId", findById);
router.patch("/me", updateUser);
router.patch("/me/avatar", updateAvatar);
// router.get("/me", getUser);
module.exports = router;
