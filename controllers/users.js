const User = require("../models/user");

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports.findById = (req, res) => {
  User.find(req.params.id)
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

// module.exports.updateUser = (req, res) => {
//   User.findByIdAndUpdate(req.params.id, { name: "Виктор Гусев" })
//     .then((user) => res.send({ data: user }))
//     .catch((err) => res.status(500).send({ message: err.message }));
// };

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send({ message: err.message }));
};
