require('dotenv').config()

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()


app.use(cors());
app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'))

const response = (req, res) => res.status(200).send('<h1>Alpha</h1>')
app.get('/', response)

const db = require('./database');
db.connect((err) => {
    return(err)
    ? console.log(`Error Connecting: ${err.stack}`)
    : console.log(`Connected as id: ${db.threadId}`);
});

const { userRouter } = require('./routers')
app.use('/user', userRouter)

const PORT = 2000
app.listen(PORT, () => console.log(`Connected to port: ${PORT}`))