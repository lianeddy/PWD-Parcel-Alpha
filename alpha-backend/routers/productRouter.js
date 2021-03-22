const router = require("express").Router();
const query = require("../database");

router.get("/", (req, res) => {
  console.log(query);
  query(`SELECT * FROM products`, (err, data) => {
    if (err) res.status(500).send({ error: err.message });
    res.status(200).send(data);
  });
});

module.exports = router;
