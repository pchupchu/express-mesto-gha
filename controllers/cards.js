const Card = require("../models/card");
const ERROR_VALIDATION = 400;
const ERROR_ID = 404;
// const OTHER_ERROR = 500;

module.exports.createCard = (req, res) => {
  const owner = req.user._id;
  console.log(req.body);
  const { name, link } = req.body;

  Card.create({ name, link, owner })
    // .populate("owner")
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === "ValidationError")
        return res.status(ERROR_VALIDATION).send({
          message: "Переданы некорректные данные при создании карточки",
        });
      res
        .status(500)
        .send(`Произошла неизвестная ошибка ${err.name}: ${err.message}`);
    });
};

module.exports.getCards = (req, res) => {
  Card.find({})
    // .populate("owner")
    .then((cards) => res.send({ data: cards }))
    .catch((err) =>
      res
        .status(500)
        .send(`Произошла неизвестная ошибка ${err.name}: ${err.message}`)
    );
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === "CastError")
        return res
          .status(ERROR_ID)
          .send({ message: "Карточка с указанным _id не найдена" });
      res
        .status(500)
        .send(`Произошла неизвестная ошибка ${err.name}: ${err.message}`);
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    // .populate("owner")
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === "ValidationError")
        return res.status(ERROR_VALIDATION).send({
          message: "Переданы некорректные данные для постановки лайка",
        });

      if (err.name === "CastError")
        return res
          .status(ERROR_ID)
          .send({ message: "Передан несуществующий _id карточки" });
      res
        .status(500)
        .send(`Произошла неизвестная ошибка ${err.name}: ${err.message}`);
    });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    // .populate("owner")
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === "ValidationError")
        return res.status(ERROR_VALIDATION).send({
          message: "Переданы некорректные данные при снятии лайка",
        });
      if (err.name === "CastError")
        return res
          .status(ERROR_ID)
          .send({ message: "Передан несуществующий _id карточки" });
      res
        .status(500)
        .send(`Произошла неизвестная ошибка ${err.name}: ${err.message}`);
    });
};
