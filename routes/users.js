const router = require("express").Router();

const {
  getUsers,
  createUser,
  findById,
  updateUser,
  updateAvatar,
} = require("../controllers/users");

router.get("/", getUsers);
router.post("/", createUser);
router.get("/:userId", findById);
router.patch("/me", updateUser);
router.patch("/me/avatar", updateAvatar);

module.exports = router;
