const router = require("express").Router();
const { validationSignup, validationSignin } = require("../utils/validation");
const { createUser, login } = require("../controllers/users");
const auth = require("../middlewares/auth");

const userRouter = require("./users");
const cardRouter = require("./cards");

router.use("/users", auth, userRouter);
router.use("/cards", auth, cardRouter);
router.post("/signin", validationSignin, login);
router.post("/signup", validationSignup, createUser);

module.exports = router;
