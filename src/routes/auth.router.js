const express = require("express");
const router = express.Router();
const passport = require("passport");

router.use(express.static("./src/public"));

function authenticateJWT(req, res, next) {
  passport.authenticate("jwt", { session: false }, (err, user, info) => {
    if (user) {
      return res.redirect("/api/products/view");
    } else {
      return next();
    }
  })(req, res, next);
}

// Ruta para el formulario de login
router.get("/login", authenticateJWT, (req, res) => {
  const error = req.query.error;
  if (error != undefined) {
    res.render("login", { error: true });
  } else {
    res.render("login");
  }
});

// Ruta para el formulario de registro
router.get("/register", authenticateJWT, (req, res) => {
  const error = req.query.error;
  if (req.user) {
    return res.redirect("/api/products/view");
  }
  if (error != undefined) {
    res.render("register", { error: true });
  } else {
    res.render("register");
  }
});

module.exports = router;
