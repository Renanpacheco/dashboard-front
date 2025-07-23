const express = require("express");
const conn = require("./db/conn");

const AuthController = require("./controller/AuthController");

const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(express.urlencoded({ extended: true }));

// helps receiving json
app.use(express.json());

//public path
app.use(express.static("public"));

//set the session to res
// pass the informations of user to front

app.use("/", authRoutes);

conn
  .sync()
  //.sync({ force: true })
  .then(() => app.listen(3000))
  .catch((err) => console.log(err));
