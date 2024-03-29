const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");

//Login
router.post(
  "/login",
  passport.authenticate("login", {
    failureRedirect: "/auth/login?error=true",
    session: false,
  }),
  async (req, res) => {
    try {
      const userForToken = {
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        age: req.user.age,
        email: req.user.email,
        rol: req.user.rol,
        cart: req.user.cart,
      };

      const token = jwt.sign(userForToken, "coderhouse", { expiresIn: "1h" });

      res.cookie("coderCookieToken", token, {
        maxAge: 3600000,
        httpOnly: true,
      });

      res.redirect("/api/products/view");
    } catch (error) {
      console.log("error_:", error);
      res.status(400).send({ error: "Error en el login" });
    }
  }
);

router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"], session: false }),
  async (req, res) => {}
);

router.get(
  "/githubcallback",
  passport.authenticate("github", {
    failureRedirect: "/auth/login?error=true",
    session: false,
  }),
  async (req, res) => {
    const userForToken = {
      first_name: req.user.first_name,
      last_name: req.user.last_name,
      age: req.user.age,
      email: req.user.email,
      rol: req.user.rol,
      cart: req.user.cart
    };

    const token = jwt.sign(userForToken, "coderhouse", { expiresIn: "1h" });

    res.cookie("coderCookieToken", token, {
      maxAge: 3600000,
      httpOnly: true,
    });

    res.redirect("/api/products/view");
  }
);

router.get("/logout", (req, res) => {
  res.clearCookie("coderCookieToken");
  res.redirect("/auth/login");
});

// la estrategia current pedida es exactamente la misma que se
// utiliza para autenticar.
// Este endpoint solo muestra el usuario
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    res.send({ user: req.user });
  }
);

module.exports = router;
