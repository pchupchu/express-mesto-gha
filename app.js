const express = require("express");
const mongoose = require("mongoose");

const { PORT = 3000 } = process.env;

const app = express();
const ERROR_NOT_FOUND = 404;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect("mongodb://127.0.0.1/mestodb");

app.use((req, res, next) => {
  req.user = {
    _id: "642d835d6a544a60740623c7",
  };

  next();
});

app.use("/", require("./routes/index"));
app.use("*", function (req, res) {
  res
    .status(ERROR_NOT_FOUND)
    .send({ message: "Запрашиваемый адрес не найден" });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
