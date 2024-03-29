const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");
const CartManagerDb = require("../controller/cartManagerDb");

// Register
router.post(
  "/",
  passport.authenticate("register", {
    failureRedirect: "/auth/register?error=true",
    session: false,
  }),
  async (req, res) => {
    console.log("entre acaa");
    const { first_name, last_name, email, password, age } = req.body;
    try {
      const userForToken = {
        first_name: first_name,
        last_name: last_name,
        age: age,
        email: email,
        rol: "user",
        cart: req.user.cart
      };

      // generamos token JWT
      const token = jwt.sign(userForToken, "coderhouse", { expiresIn: "1h" });

      // mandamos como cookie el token
      res.cookie("coderCookieToken", token, {
        maxAge: 3600000,
        httpOnly: true,
      });

      res.redirect("/api/products/view");
    } catch (error) {
      console.log("Error al crear el usuario:", error);
      res.status(500).send({ error: "Error al guardar el usuario nuevo" });
    }
  }
);

module.exports = router;
