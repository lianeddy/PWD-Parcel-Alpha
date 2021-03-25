// require('dotenv').config()
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const server = require("http").createServer(app);
const port = process.env.PORT || 2000;
const bearerToken = require("express-bearer-token");

const { userRouter, productRouter } = require("./routers");

//! PENTINGGG!!!!!!
app.use(cors());
app.use(bearerToken());
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.status(200).send("<h2>API for Parcel Alpha</h2>");
});

app.use("/users", userRouter);
app.use("/products", productRouter);

server.listen(port, () => console.log(`API active at port ${port}`));
// {
//   "id": 25,
//   "username": "bayufer",
//   "email": "bayuferdiman2@gmail.com",
//   "roleID": 2,
//   "verified": 2,
//   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjUsInVzZXJuYW1lIjoiYmF5dWZlciIsImVtYWlsIjoiYmF5dWZlcmRpbWFuMkBnbWFpbC5jb20iLCJyb2xlSUQiOjIsInZlcmlmaWVkIjoyLCJpYXQiOjE2MTY0NzM2MDYsImV4cCI6MTYxNjUxNjgwNn0.oRGZVba1zdcckD4TTRpHtgvuj-U9LySIwWD551hXWC8"
// }

// {
//   "username" : "bayufer",
//   "password" : "asd1qwe23.",
//   "email" : "bayuferdiman2@gmail.com"
// }

// {
//   "id": 26,
//   "username": "bayuferdiman",
//   "email": "bayuferdiman1@gmail.com",
//   "roleID": 2,
//   "verified": 2,
//   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjYsInVzZXJuYW1lIjoiYmF5dWZlciIsImVtYWlsIjoiYmF5dWZlcmRpbWFuMUBnbWFpbC5jb20iLCJyb2xlSUQiOjIsInZlcmlmaWVkIjoyLCJpYXQiOjE2MTY0NzQ5NjUsImV4cCI6MTYxNjUxODE2NX0.MFVSZaB8Wv_H_eiLsaqyMopLaHFbcC9lYdmfRUeFI_U"
// }

// {
//   "username" : "bayufer",
//   "password" : "asd1qwe23.",
//   "email" : "bayuferdiman1@gmail.com"
// }
