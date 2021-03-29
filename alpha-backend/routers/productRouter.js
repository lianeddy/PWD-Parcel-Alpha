const router = require("express").Router();
const query = require("../database");
const { uploader } = require("../handlers");
const fs = require("fs");
const pify = require("pify");

router.get("/", (req, res) => {
  let sql = `SELECT * FROM products `;
  if (req.query.priceMin && req.query.priceMax && req.query.productName) {
    sql += ` WHERE PRICE > ${parseInt(
      req.query.priceMin
    )} AND PRICE < ${parseInt(
      req.query.priceMax
    )} AND LOWER(productName) LIKE ('%${
      req.query.productName
    }%') ORDER BY PRICE ASC`;
  } else if (req.query.priceMin) {
    sql += ` WHERE PRICE > ${req.query.priceMin} ORDER BY PRICE ASC`;
  } else if (req.query.priceMax) {
    sql += ` WHERE PRICE < ${req.query.priceMax} ORDER BY PRICE ASC `;
  } else if (req.query.productName) {
    sql += ` WHERE LOWER(productName) LIKE ('%${req.query.productName}%')`;
  }
  query(sql, (err, data) => {
    if (err) return res.status(500).send({ error: err.message });
    return res.status(200).send(data);
  });
});

// Get per id
router.get("/:id", (req, res) => {
  query(
    `SELECT * FROM products WHERE id_product = ${req.params.id}`,
    (err, data) => {
      if (err) {
        return res.status(500).send(err.message);
      }
      console.log(data[0]);
      return res.status(200).send(data[0]);
    }
  );
});

// Get product by admin
router.get("/admin/product", async (req, res) => {
  try {
    const response = await query(`select 
    p.productName,
    p.id_product, p.price,
    p.description,p.isAvailable,
    p.stock,p.imagepath,c.categoryName
     from products p left join categories c on p.categoryID = c.id`);
    //  console.log(response);
    return res.status(200).send(response);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

// TODO : Insert, Update, Delete
// Just Uploud Email
//
router.post("/:id", (req, res) => {
  try {
    const path = "/products";
    const upload = uploader(path, "PRD").fields([{ name: "image" }]);
    upload(req, res, (err) => {
      const { image } = req.files;
      const imagePath = image ? `${path}/${image[0].filename}` : null;

      let sql = `update products set imagepath = '${imagePath}' where id_product = ${req.params.id}`;
      query(sql, (err, data) => {
        if (err) {
          fs.unlinkSync(`public${imagePath}`);
          return res.status(500).send(err.message);
        }
        return res
          .status(201)
          .send({ message: "Data Created", status: "Created" });
      });
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send(err.message);
  }
});

//  Insert
router.post("/admin/products", async (req, res) => {
  try {
    const path = "/products";
    const upload = pify(uploader(path, "PRD").fields([{ name: "image" }]));
    await upload(req, res, (err) => {
      const { image } = req.files;
      const { productName, price, description, stock, categoryID } = JSON.parse(
        req.body.data
      );
      const imagePath = image ? `${path}/${image[0].filename}` : null;
      console.log(imagePath);
      let sql = `INSERT INTO products (productName, price, description, stock, isAvailable, imagepath,categoryID) VALUES ('${productName}', ${price}, '${description}', ${stock}, 1, '${imagePath}', ${categoryID})`;
      query(sql, (err, data) => {
        if (err) {
          fs.unlinkSync(`public${imagePath}`);
          return res.status(500).send(err.message);
        }
        return res
          .status(201)
          .send({ message: "Data Created", status: "Created" });
      });
    });
  } catch (err) {
    res.status(500).send(err.message);
    // console.log(err);
  }
});

// Edit Gambar baru
router.patch("/:id_product", async (req, res) => {
  console.log(req.params.id_product);
  await query(
    `SELECT * FROM products WHERE id_product = ${req.params.id_product}`,
    async (err, data) => {
      const oldImagePath = data[0].imagepath;
      const idProduct = data[0].id_product;
      try {
        const path = "/products";
        const upload = pify(uploader(path, "PRD").fields([{ name: "image" }]));

        await upload(req, res, (err) => {
          // console.log(req.files.image);

          const { image } = req.files;
          const {
            productName,
            price,
            description,
            stock,
            categoryName,
          } = JSON.parse(req.body.data);

          // console.log(idProduct);
          // console.log(JSON.parse(req.body.data));

          const imagePath = image
            ? `${path}/${image[0].filename}`
            : oldImagePath;
          console.log(imagePath);

          let sql = `UPDATE products SET productName = '${productName}', price = ${price}, description = '${description}',categoryID = ${categoryName} ,stock = ${stock}, imagepath = '${imagePath}' WHERE id_product = ${idProduct}`;

          query(sql, (err) => {
            // if (err) {
            //   fs.unlinkSync(`public${imagePath}`);
            //   res.status(500).send(err);
            // }
            if (image && oldImagePath !== null) {
              fs.unlinkSync(`public${oldImagePath}`);
            }

            return res.status(200).send({
              message: "Data Edited",
              status: "Edited",
            });
          });
        });
      } catch (err) {
        return res.status(500).send(err.message);
      }
    }
  );
});

// Delete
// for restock
router.put("/:id", (req, res) => {
  const sql = `UPDATE products SET isAvailable = 0 WHERE id_product = ${req.params.id}`;
  query(sql, (err) => {
    if (err) {
      return res.status(500).send(err.message);
    }
    return res.status(200).send({
      status: "Edited",
      message: `Set Unavailable Product ID = ${req.params.id}`,
      purpose: "If the Admin want to restock the product",
    });
  });
});

// Delete product
// in row database & delete imagepath product
router.delete("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  // console.log(id);
  try {
    const product = await query(
      `SELECT * FROM products WHERE id_product = ${id}`
    );
    const idProduct = product[0].id_product;
    // console.log(product);
    const oldImagePath = product[0].imagepath;
    await query(`DELETE FROM products WHERE id_product = ${idProduct}`);
    fs.unlinkSync(`public${oldImagePath}`);
    return res.status(200).send({ message: "Data Deleted", status: "Deleted" });
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

router.patch("/change-ischecked/:id", (req, res) => {
  const product_id = parseInt(req.params.id);
  console.log(req.params);
  query(
    `UPDATE products SET isChecked = 1 WHERE id_product = ${product_id}`,
    (err, data) => {
      if (err) res.status(500).send({ error: err.message });
      // query(
      //   `SELECT * FROM products where id_product = ${product_id}`,
      //   (err, product) => {
      //     if (err) res.status(500).send({ error: err.message });
      //     console.log(product);
      //   }
      // );
      res.status(200).send({ message: "success" });
    }
  );
});

router.get("/:id", (req, res) => {
  const product_id = parseInt(req.params.id);
  query(
    `SELECT * FROM products WHERE id_product = ${product_id}`,
    (err, data) => {
      console.log(err);
      if (err) return res.status(400).send({ error: err.message });
      return res.status(200).send(data[0]);
    }
  );
});
module.exports = router;
