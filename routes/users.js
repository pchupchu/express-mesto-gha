const router = require("express").Router();

const { getUsers, createUser, findById } = require("../controllers/users");

router.get("/", getUsers);
router.post("/", createUser);
router.get("/:id", findById);

module.exports = router;
