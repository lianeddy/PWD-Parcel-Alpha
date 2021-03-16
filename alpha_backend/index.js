const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const server = require("http").createServer(app);
const port = process.env.PORT || 2000;

const { userRouter } = require("./router");

app.use(cors());
app.use(bodyParser());

app.get("/", (req, res) => {
  res.status(200).send("<h1>API PWD PARCEL ALPHA</h1>");
});

app.use("/user", userRouter);

server.listen(port, () => console.log(`API active at port ${port}`));
