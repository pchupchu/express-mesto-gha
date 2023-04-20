const router = require("express").Router();
//const { validationSignup } = require("../errors/validation");
const { createUser, login } = require("../controllers/users");
const auth = require("../middlewares/auth");

const userRouter = require("./users");
const cardRouter = require("./cards");

router.use("/users", auth, userRouter);
router.use("/cards", auth, cardRouter);
router.post("/signin", login);
router.post("/signup", createUser);

module.exports = router;
