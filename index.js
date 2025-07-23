const express = require("express");
const conn = require("./db/conn");

const app = express();

app.use(express.urlencoded({ extended: true }));

// helps receiving json
app.use(express.json());

//public path
app.use(express.static("public"));

//set the session to res
// pass the informations of user to front
app.use((req, res, next) => {
  if (req.session.userid) {
    res.locals.session = req.session;
  }
  next();
});

conn
  .sync()
  //sync({force:true})
  .then(() => app.listen(3000))
  .catch((err) => console.log(err));
