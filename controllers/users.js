const User = require("../models/user");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const NotFoundError = require("../errors/not-found-err");
const ERROR_BAD_REQUEST = 400;
const ERROR_NOT_FOUND = 404;
const OTHER_ERROR = 500;

module.exports.createUser = (req, res) => {
  const { name, about, avatar, email, password } = req.body;
  bcrypt.hash(password, 6).then((hash) => {
    User.create({ name, about, avatar, email, password: hash })
      .then((user) => res.status(201).send({ data: user }))
      .catch((err) => {
        console.log("hello");
        if (err instanceof mongoose.Error.ValidationError)
          return res.status(ERROR_BAD_REQUEST).send({
            message: "Переданы некорректные данные при создании пользователя",
          });
        res
          .status(OTHER_ERROR)
          .send(`Произошла неизвестная ошибка ${err.name}: ${err.message}`);
      });
  });
};

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) =>
      res
        .status(OTHER_ERROR)
        .send(`Произошла неизвестная ошибка ${err.name}: ${err.message}`)
    );
};

module.exports.findById = (req, res, next) => {
  User.findById(req.params.userId)
    // .then((user) => {
    //   if (!user) {
    //     next(new NotFoundError("Пользователь по указанному _id не найден"));
    //   }
    //   return res.send(user);
    // })
    // .catch(next);

    .then((user) => {
      if (!user) {
        return res
          .status(ERROR_NOT_FOUND)
          .send({ message: "Пользователь по указанному _id не найден" });
      }
      res.send({ data: user });
    })
    .catch((err) => {
      console.log(err.name);
      if (err instanceof mongoose.Error.CastError)
        return res
          .status(ERROR_BAD_REQUEST)
          .send({ message: "Некорректно введенные данные" });
      res
        .status(OTHER_ERROR)
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
    { new: true, runValidators: true }
  )
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError)
        return res.status(ERROR_BAD_REQUEST).send({
          message: "Переданы некорректные данные при обновлении профиля",
        });
      res
        .status(OTHER_ERROR)
        .send(`Произошла неизвестная ошибка ${err.name}: ${err.message}`);
    });
};

module.exports.updateAvatar = (req, res) => {
  User.findByIdAndUpdate(
    req.user._id,
    {
      avatar: req.body.avatar,
    },
    { new: true, runValidators: true }
  )
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError)
        return res.status(ERROR_BAD_REQUEST).send({
          message: "Переданы некорректные данные при обновлении аватара",
        });
      res
        .status(OTHER_ERROR)
        .send(`Произошла неизвестная ошибка ${err.name}: ${err.message}`);
    });
};

module.exports.login = (req, res) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      console.log(user);
      const token = jwt.sign({ _id: user._id }, "super-strong-secret", {
        expiresIn: "7d",
      });

      res.send({ token });
    })
    .catch((err) => {
      res.status(401).send({ message: err.message });
    });
};

module.exports.getUser = (req, res, next) => {
  User.findOne({ _id: req.params.userId })
    .then((user) => {
      if (!user) {
        throw new NotFoundError("Нет пользователя с таким id");
      }
      res.send({ data: user });
    })
    .catch(next);
};
