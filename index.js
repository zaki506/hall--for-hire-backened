const express = require("express");
const cors = require("cors");
const routes = require("./routes/index");
const bodyParser = require("body-parser");
require("./models/index");

let app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json());

//Using routes here
app.get("/", (req, res) => {
  return res.status(200).json({
    msg: "Hello - Server is running at port : " + port,
  });
});
app.use("/api", routes, (req, res) => {
  res.send("Server is up and running")
});

app.listen(port, () => {
  console.log(
    "Server is up and running at port : ",
    port,
    process.env.NODE_ENV ? process.env.NODE_ENV : ""
  );
});