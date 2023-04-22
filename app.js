const express = require("express");
const mongoose = require("mongoose");
const { errors } = require("celebrate");

const { PORT = 3000 } = process.env;

const app = express();
const ERROR_NOT_FOUND = 404;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect("mongodb://127.0.0.1:27017/mestodb");

app.use("/", require("./routes/index"));
app.use("*", function (req, res) {
  res
    .status(ERROR_NOT_FOUND)
    .send({ message: "Запрашиваемый адрес не найден" });
});
app.use(errors());
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res.status(statusCode).send({
    message: statusCode === 500 ? "На сервере произошла ошибка" : message,
  });
  next();
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
