// require('dotenv').config()

// const express = require('express')
// const cors = require('cors')
// const bodyParser = require('body-parser')

// const app = express()


// app.use(cors());
// app.use(bodyParser.json());

// app.use(express.static(__dirname + '/public'))

// const response = (req, res) => res.status(200).send('<h1>Alpha</h1>')
// app.get('/', response)

// const db = require('./database');
// db.connect((err) => {
//     return(err)
//     ? console.log(`Error Connecting: ${err.stack}`)
//     : console.log(`Connected as id: ${db.threadId}`);
// });

// const { userRouter } = require('./routers')
// app.use('/user', userRouter)

// const PORT = 2000
// app.listen(PORT, () => console.log(`Connected to port: ${PORT}`))


const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const server = require("http").createServer(app);
const port = process.env.PORT || 2000;

const { userRouter, productRouter } = require("./routers");

app.use(cors());
app.use(bodyParser());

app.get("/", (req, res) => {
  res.status(200).send("<h2>API for Parcel Alpha</h2>");
});

app.use("/user", userRouter);
app.use("/products", productRouter);

server.listen(port, () => console.log(`API active at port ${port}`));

