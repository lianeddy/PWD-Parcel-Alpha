const router = require("express").Router();
const query = require("../database");

router.get("/", (req, res) => {
  query(`SELECT * FROM products`, (err, data) => {
    if (err) res.status(500).send({ error: err.message });
    res.status(200).send(data);
  });
});

router.get("/:id", (req, res) => {
  const product_id = parseInt(req.params.id);
  query(`SELECT * FROM products WHERE id = ${product_id}`, (err, data) => {
    if (err) res.status(400).send({ error: err.message });
    res.status(200).send(data);
  });
});

module.exports = router;
