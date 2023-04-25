const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const BadRequest = require('../errors/bad-request');
const NotFoundError = require('../errors/not-found-err');
const Conflict = require('../errors/conflict');

module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt

    .hash(password, 6)
    .then((hash) => {
      User.create({
        name,
        about,
        avatar,
        email,
        password: hash,
      })
        .then((user) => res.status(201).send({
          data: {
            name: user.name,
            about: user.about,
            avatar: user.avatar,
            email: user.email,
          },
        }))
        .catch((err) => {
          if (err instanceof mongoose.Error.ValidationError) {
            return next(
              new BadRequest(
                'Переданы некорректные данные при создании пользователя',
              ),
            );
          }
          if (err.code === 11000) {
            return next(
              new Conflict('Пользователь с таким email уже существует'),
            );
          }
          next(err);
        });
    })
    .catch(next);
};

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(next);
};

module.exports.getUser = (req, res, next) => {
  User.findOne({ _id: req.user._id })
    .then((user) => {
      if (!user) {
        return next(new NotFoundError('Нет пользователя с таким id'));
      }
      res.send({ data: user });
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        return next(new BadRequest('Переданы некорректные данные'));
      }
      next(err);
    });
};

module.exports.findById = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        return next(
          new NotFoundError('Пользователь по указанному _id не найден'),
        );
      }
      res.send({ data: user });
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        return next(new BadRequest('Переданы некорректные данные'));
      }
      next(err);
    });
};

module.exports.updateUser = (req, res, next) => {
  User.findByIdAndUpdate(
    req.user._id,
    {
      name: req.body.name,
      about: req.body.about,
    },
    { new: true, runValidators: true },
  )
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        return next(
          new BadRequest('Переданы некорректные данные при обновлении профиля'),
        );
      }
      next(err);
    });
};

module.exports.updateAvatar = (req, res, next) => {
  User.findByIdAndUpdate(
    req.user._id,
    {
      avatar: req.body.avatar,
    },
    { new: true, runValidators: true },
  )
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        return next(
          new BadRequest('Переданы некорректные данные при обновлении аватара'),
        );
      }
      next(err);
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'super-strong-secret', {
        expiresIn: '7d',
      });

      res.send({ token });
    })
    .catch(next);
};
