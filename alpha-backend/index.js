// require('dotenv').config()
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const server = require("http").createServer(app);
const port = process.env.PORT || 2000;
const bearerToken = require("express-bearer-token");

const { userRouter, productRouter } = require("./routers");

app.use(cors());
app.use(bodyParser());
app.use(bearerToken())

app.get("/", (req, res) => {
  res.status(200).send("<h2>API for Parcel Alpha</h2>");
});

app.use("/user", userRouter);
app.use("/products", productRouter);

server.listen(port, () => console.log(`API active at port ${port}`));

