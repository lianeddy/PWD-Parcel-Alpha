const router = require("express").Router();
const query = require("../database");
const { uploader } = require("../handlers");

router.get("/", (req, res) => {
  let sql = `SELECT * FROM products `;
  if (req.query.priceMin && req.query.priceMax) {
    sql += ` WHERE PRICE > ${parseInt(
      req.query.priceMin
    )} AND PRICE < ${parseInt(req.query.priceMax)} ORDER BY PRICE ASC`;
  } else if (req.query.priceMin) {
    sql += ` WHERE PRICE > ${req.query.priceMin} ORDER BY PRICE ASC`;
  } else if (req.query.priceMax) {
    sql += ` WHERE PRICE < ${req.query.priceMax} ORDER BY PRICE ASC `;
  }
  query(sql, (err, data) => {
    if (err) return res.status(500).send({ error: err.message });
    return res.status(200).send(data);
  });
});

// Get per id
// router.get("/:imagepath", (req, res) => {
//   console.log(req.params.imagepath);
//   const imagepath = parseInt(req.params);
//   query(`SELECT * FROM products WHERE imagepath = "/products/${imagepath}"`, (err, data) => {
//     if (err) {
//       return res.status(500).send(err.message);
//     }
//     return res.status(200).send(data)
//   });
// });

// Uploud gambar product per Id,
// tambahkan column imagepath di products varcahr(>45)
// default path di uplouder diganti /image
// output = image/products/PRD.......
// req.body = image
router.post("/:id", (req, res) => {
  try {
    const path = "/products";
    const upload = uploader(path, "PRD").fields([{ name: "image" }]);
    upload(req, res, (err) => {
      const { image } = req.files;
      const imagePath = image ? `${path}/${image[0].filename}` : null;

      let sql = `update products set imagepath = '${imagePath}' where id = ${req.params.id}`;
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

// Edit Gambar baru
// router.patch("/:id", (req, res) => {
//   query(`SELECT * FROM products WHERE id = ${req.params.id}`, (err, data) => {
//     const oldImagePath = data[0].imagepath;
//     const idProduct = data[0].id;
//     console.log(data);

//     try {
//       const path = "/products";
//       const upload = uploader(path, "PRD").fields([{ name: "image" }]);

//       upload(req, res, (err) => {
//         const { image } = req.files;
//         const { productName, price, description, stock } = JSON.parse(
//           req.body.data
//         );

//         // apabila user tidak mengupload foto baru maka sql akan mengupdate menggunakan foto yang lama
//         const imagePath = image ? `${path}/${image[0].filename}` : oldImagePath;

//         let sql = `UPDATE products SET productName = '${productName}', price = ${price}, description = '${description}', stock = ${stock}, imagepath = ${
//           imagePath ? `${imagePath}` : null
//         } WHERE id = ${idProduct}`;

//         // let sql = `INSERT INTO products (productName, price, description, stock, isAvailable, imagepath) VALUES ('${productName}', ${price}, '${description}', '${stock}', 1, '${imagePath}')`;

//         // let sql = `UPDATE products set imagepath = '${imagePath}' WHERE id = ${idProduct}`;

//         query(sql, (err) => {
//           if (err) {
//             fs.unlinkSync(`public${imagePath}`);
//             res.status(500).send(err);
//           }

//           // Apabila user upload foto baru dan kolom imagepath sudah terisi dengan foto produk
//           if (image && oldImagePath !== null) {
//             fs.unlinkSync(`public${oldImagePath}`);
//           }

//           return res.status(200).send({
//             message: "Data Edited",
//             status: "Edited",
//           });
//         });
//       });
//     } catch (err) {
//       return res.status(500).send(err.message);
//     }
//   });
// });

module.exports = router;
