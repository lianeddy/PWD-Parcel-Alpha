const router = require("express").Router();
const query = require("../database");

router.get("/all", (req, res) => {
  let sql = `SELECT * FROM products`;
  query(sql, (err, data) => {
    if (err) res.status(500).send(err.message);
    return res.status(200).send(data);
  });
});

module.exports = router;
