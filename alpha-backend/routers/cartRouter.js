const router = require("express").Router();
const { json } = require("body-parser");
const query = require("../database");

const selectCartQuery = (userId) =>
  `SELECT * FROM cart_test WHERE user_id = ${userId}`;
const insertQuery = (userId, contents) => {
  return `INSERT INTO cart_test (user_id, content) VALUES (${userId},'${contents}');`;
};
const updateQuery = (userId, contents) => {
  return `UPDATE cart_test SET  content = '${contents}' WHERE user_id = ${userId};`;
};

router.post("/:user_id", async (req, res) => {
  try {
    const existingCart = await query(
      selectCartQuery(parseInt(req.params.user_id))
    );
    if (existingCart.length === 0) {
      await query(insertQuery(req.params.user_id, JSON.stringify(req.body)));
      return res.status(200).send({ message: "success" });
    } else {
      const cart = JSON.parse(existingCart[0].content);
      const parcels = req.body.parcels;
      cart.parcels && parcels && cart.parcels.push(...parcels);

      const products = req.body.products;
      const existingProductIds = new Set();
      const updatedProducts = cart.products
        ? cart.products.map((product) => {
            const reqProductFound = products.find(
              ({ id_product }) => id_product === product.id_product
            );
            if (reqProductFound) {
              existingProductIds.add(product.id_product);
              return { ...product, qty: product.qty + reqProductFound.qty };
            }
            return product;
          })
        : [];
      cart.products = updatedProducts;
      products.forEach((product) => {
        if (!existingProductIds.has(product.id_product)) {
          cart.products.push(product);
        }
      });
      await query(updateQuery(req.params.user_id, JSON.stringify(cart)));
    }
    return res.status(200).send({ message: "success" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error });
  }
});

// router.get("/:user_id", (req, res) => {
//   query(selectCartQuery(parseInt(req.params.user_id)), (err, data) => {
//     if (err) return res.status(500).send({ error: err.message });
//     if (data.length === 0) return res.status(200).send(null);
//     // console.log(JSON.parse(data[0].content));
//     console.log(`///nyampe sini sih///`);
//     res.status(200).send(JSON.parse(data[0].content));
//   });
// });

router.get("/parcels/:user_id", async (req, res) => {
  try {
    const parcelCart = await query(
      `SELECT 
      parc.cart_id, parc.parcelID, parc.parcel_qty,pp.parcelName, pp.parcelPrice, pp.imagepath
      FROM user_cart uc
      JOIN parcel_cart parc ON parc.cart_id = uc.user_cart_id
      JOIN parcel_price pp ON pp.parcel_id = parc.parcelID
      WHERE uc.user_id = ${req.params.user_id}
    ;`
    );
    // parcelCart = JSON.parse(parcelCart[0].content);
    // console.log(parcelCart);
    res.status(200).send(parcelCart);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

router.get("/products/:user_id", async (req, res) => {
  try {
    const productCart = await query(`SELECT 
    proc.cart_id, proc.productID, proc.product_qty, p.productName, p.price, p.imagepath
    FROM user_cart uc
    JOIN product_cart proc ON proc.cart_id = uc.user_cart_id
    JOIN products p ON p.id_product = proc.productID
        WHERE uc.user_id = ${req.params.user_id};`);
    // console.log(productCart);
    res.status(200).send(productCart);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

router.patch("/parcels/:user_id", async (req, res) => {
  try {
    const updateParcelCart = await query(`
    UPDATE parcel_cart parc
    JOIN user_cart uc ON parc.cart_id = uc.user_cart_id
    JOIN parcel_price pp ON pp.parcel_id = parc.parcelID
    SET parc.parcel_qty = ${req.body.quantity}
    WHERE uc.user_id = ${req.params.user_id}
    AND parc.parcelID = ${req.params.parcelID};`);
    console.log(updateParcelCart);
    res.status(200).send(updateParcelCart);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

module.exports = router;
