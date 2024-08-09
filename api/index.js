const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const config = require("../config");
const app = express();

const auth = require("./components/auth/network");
const cifs = require("./components/cifs/network");
const log = require("./components/log/network");

app.listen(config.app.port, () => {
  console.log(`App listening on ${config.app.port}`);
});

//MIDDLEWARES
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

//ROUTING
app.use("/api/auth", auth);
app.use("/api/cifs", cifs);
app.use("/api/log", log);
