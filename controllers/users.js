const User = require("../models/user");
const ERROR_VALIDATION = 400;
const ERROR_ID = 404;
// const OTHER_ERROR = 500;

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === "ValidationError")
        return res.status(ERROR_VALIDATION).send({
          message: "Переданы некорректные данные при создании пользователя",
        });
      res
        .status(500)
        .send(`Произошла неизвестная ошибка ${err.name}: ${err.message}`);
    });
};

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) =>
      res
        .status(500)
        .send(`Произошла неизвестная ошибка ${err.name}: ${err.message}`)
    );
};

module.exports.findById = (req, res) => {
  User.find(req.params.id)
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === "CastError")
        return res
          .status(ERROR_ID)
          .send({ message: "Пользователь по указанному _id не найден" });
      res
        .status(500)
        .send(`Произошла неизвестная ошибка ${err.name}: ${err.message}`);
    });
};

module.exports.updateUser = (req, res) => {
  User.findByIdAndUpdate(
    req.user._id,
    {
      name: req.body.name,
      about: req.body.about,
    },
    { new: true },
    { runValidators: true }
  )
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === "ValidationError")
        return res.status(ERROR_VALIDATION).send({
          message: "Переданы некорректные данные при обновлении профиля",
        });
      if (err.name === "CastError")
        return res
          .status(ERROR_ID)
          .send({ message: "Пользователь с указанным _id не найден" });
      res
        .status(500)
        .send(`Произошла неизвестная ошибка ${err.name}: ${err.message}`);
    });
};

module.exports.updateAvatar = (req, res) => {
  User.findByIdAndUpdate(
    req.user._id,
    {
      avatar: req.body.avatar,
    },
    { new: true },
    { runValidators: true }
  )
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === "ValidationError")
        return res.status(ERROR_VALIDATION).send({
          message: "Переданы некорректные данные при обновлении аватара",
        });
      if (err.name === "CastError")
        return res
          .status(ERROR_ID)
          .send({ message: "Пользователь с указанным _id не найден" });
      res
        .status(500)
        .send(`Произошла неизвестная ошибка ${err.name}: ${err.message}`);
    });
};
