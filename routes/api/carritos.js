const router = require("express").Router();
const { createTbi } = require("../../models/carrito");
const { checkToken } = require("../middlewares");
//!-TBI
//checkToken para recuperar token con el id de usuario
router.post("/compra", checkToken, async (req, res) => {
  console.log(req.body);
  try {
    for (let producto of req.body) {
      const result = await createTbi(producto.id, req.user.id);
    }
    res.json({ mensaje: "Se han insertado los productos del carrito" });
  } catch (error) {
    console.log(error);
    res.json({ error: error.message });
  }
});
module.exports = router;
