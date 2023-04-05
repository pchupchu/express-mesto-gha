const Card = require("../models/card");
const ERROR_BAD_REQUEST = 400;
const ERROR_NOT_FOUND = 404;
const OTHER_ERROR = 500;

module.exports.createCard = (req, res) => {
  const owner = req.user._id;
  console.log(req.body);
  const { name, link } = req.body;

  Card.create({ name, link, owner })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === "ValidationError")
        return res.status(ERROR_BAD_REQUEST).send({
          message: "Переданы некорректные данные при создании карточки",
        });
      res
        .status(OTHER_ERROR)
        .send(`Произошла неизвестная ошибка ${err.name}: ${err.message}`);
    });
};

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch((err) =>
      res
        .status(OTHER_ERROR)
        .send(`Произошла неизвестная ошибка ${err.name}: ${err.message}`)
    );
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) {
        return res
          .status(ERROR_NOT_FOUND)
          .send({ message: "Карточка с указанным _id не найдена" });
      }
      res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === "CastError")
        return res
          .status(ERROR_BAD_REQUEST)
          .send({ message: "Некорректно введенные данные" });
      res
        .status(OTHER_ERROR)
        .send(`Произошла неизвестная ошибка ${err.name}: ${err.message}`);
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .then((card) => {
      if (!card) {
        return res
          .status(ERROR_NOT_FOUND)
          .send({ message: "Передан несуществующий _id карточки" });
      }
      res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === "CastError")
        return res.status(ERROR_BAD_REQUEST).send({
          message: "Переданы некорректные данные для постановки лайка",
        });
      res
        .status(OTHER_ERROR)
        .send(`Произошла неизвестная ошибка ${err.name}: ${err.message}`);
    });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .then((card) => {
      if (!card) {
        return res
          .status(ERROR_NOT_FOUND)
          .send({ message: "Передан несуществующий _id карточки" });
      }
      res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === "CastError")
        return res.status(ERROR_BAD_REQUEST).send({
          message: "Переданы некорректные данные при снятии лайка",
        });
      res
        .status(OTHER_ERROR)
        .send(`Произошла неизвестная ошибка ${err.name}: ${err.message}`);
    });
};
