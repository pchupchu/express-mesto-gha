const router = require("express").Router();
const { createUser, login } = require("../controllers/users");

const userRouter = require("./users");
const cardRouter = require("./cards");

router.use("/users", userRouter);
router.use("/cards", cardRouter);
router.post("/signin", login);
router.post("/signup", createUser);

module.exports = router;
