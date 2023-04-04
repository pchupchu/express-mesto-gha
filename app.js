const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const { PORT = 3000 } = process.env;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose
  .connect("mongodb://127.0.0.1/mestodb")
  .then(() => console.log("DB is connected"))
  .catch((err) => console.log(err));

app.use("/users", require("./routes/users"));

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

//"_id": "642c0bf809c98eefc507db63",
