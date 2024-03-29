const express = require("express");
const router = express.Router();
const ProductManagerDb = require("../controller/productManagerDb");
const productManagerDb = new ProductManagerDb();
const passport = require("passport");

router.use(express.static("./src/public"));

router.get(
  "/view",
  passport.authenticate("jwt", { session: false, failureRedirect: "/auth/login" }),
  async (req, res) => {
    // if (req.auth == false) {
    //   return res.redirect("/auth/login");
    // }
    try {
      const products = await productManagerDb.getProducts(req.query);
      res.render("products", {
        products: products,
        active: { products: true },
        user: req.user,
      });
    } catch (err) {
      console.log("entre ene error")
      res.status(500).json({ error: err });
    }
  }
);

router.get(
  "/view/:id",
  passport.authenticate("jwt", { session: false, failureRedirect: "/auth/login" }),
  async (req, res) => {
    const id = req.params.id;
    try {
      const product = await productManagerDb.getProductById(id);
      res.render("product", {
        product: product,
      });
    } catch (err) {
      res.status(500).json({ error: err });
    }
  }
);

router.get("/", async (req, res) => {
  try {
    const products = await productManagerDb.getProducts(req.query);
    res.status(201).json(products);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

router.get("/:pid", async (req, res) => {
  const { pid } = req.params;
  try {
    const product = await productManagerDb.getProductById(pid);
    if (product) {
      res.json(product);
    } else {
      res.json({ error: "Producto no encontrado" });
    }
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

router.delete("/:pid", async (req, res) => {
  const { pid } = req.params;
  if (pid) {
    try {
      await productManagerDb.deleteProduct(pid);
      res.status(200).json({ message: `Product with id ${pid} deleted` });
    } catch (err) {
      res.status(500).json({ error: err });
    }
  }
});

router.post("/", async (req, res) => {
  const newProduct = req.body;
  try {
    const response = await productManagerDb.addProduct(newProduct);
    res.status(201).json({ response });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

router.put("/:pid", async (req, res) => {
  const { pid } = req.params;
  const newProductValues = req.body;
  if (pid != undefined && newProductValues) {
    try {
      await productManagerDb.updateProduct(pid, newProductValues);
      res.status(201).json({ message: `Product with id ${pid} updated` });
    } catch (err) {
      res.status(500).json({ error: "Error de servidor" });
    }
  } else {
    res.json({ message: err });
  }
});

module.exports = router;
