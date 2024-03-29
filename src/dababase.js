const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://vargasivanezequiel:coderhouse@cluster0.sybi3ex.mongodb.net/e-commerce?retryWrites=true&w=majority"
  )
  .then(() => console.log("conectados a la base de datos"))
  .catch((err) => console.log(err));