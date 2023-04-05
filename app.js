const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const { PORT = 3000 } = process.env;

const app = express();
const ERROR_NOT_FOUND = 404;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect("mongodb://127.0.0.1/mestodb");

app.use((req, res, next) => {
  req.user = {
    _id: "642c0bf809c98eefc507db63",
  };

  next();
});

app.use("/users", require("./routes/users"));
app.use("/cards", require("./routes/cards"));
app.use("*", function (req, res) {
  res
    .status(ERROR_NOT_FOUND)
    .send({ message: "Запрашиваемый адрес не найден" });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
