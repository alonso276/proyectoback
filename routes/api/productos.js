
const router = require("express").Router();
const {create, getAll, getCategory, getByCategory, getByProductorId, getByProductComarca}= require('../../models/producto');
const {checkToken,UsuarioPerfil} = require("../middlewares");
//?multer
const multer=require('multer');
const upload = multer({ dest: "public/images" });
const fs= require('fs');



//!productos--registro
                                 //?middleware de multer pload.single('imagen')
                                    
router.post("/registro",checkToken,UsuarioPerfil,upload.single('imagen'),async (req, res) => {
   console.log(req.file)
  // Antes de guardar el producto en la base de datos, modificamos la imagen para situarla donde nos interesa
  const extension = "." + req.file.mimetype.split("/")[1];
  // Obtengo el nombre de la nueva imagen
  const newName = req.file.filename + extension;
  // Obtengo la ruta donde estará, adjuntándole la extensión
  const newPath = req.file.path + extension;
  // Muevo la imagen para que resiba la extensión
  fs.renameSync(req.file.path, newPath);

  // Modifico el BODY para poder incluir el nombre de la imagen en la BD
  req.body.imagen = newName;

  
  try {
   
                                          //added req.user.id
    const result = await create(req.body, req.user.id);
   
    res.json(result);
  } catch (error) {
    res.json({ error: error.message });
  }
});


//!productosgetAll

  router.get('/all', async (req, res) => {

    try {
        const rows = await getAll();
        res.json(rows);
    } catch (error) {
        res.json({ error: error.message });
    }
});

//!productos por categoría en el select.
router.get('/categoria', async (req, res) => {


  try {
      const rows = await getCategory();
      res.json(rows);
  } catch (error) {
      res.json({ error: error.message });
  }
});


//! productos por categoría de productos
router.get('/cat/:categoria', async(req,res)=> {

  try {
    const rows = await getByCategory(req.params.categoria);
    res.json(rows);
} catch (error) {
    res.json({ error: error.message });
}

})

//! productos por cada productor

router.get('/from/:productorfkUsuario', async(req,res)=>{

  try {
    const rows = await getByProductorId(req.params.productorfkUsuario);
    res.json(rows);
} catch (error) {
    res.json({ error: error.message });
}


})

//!productos por cada comarca

router.get('/com/:comarca', async(req,res)=>{

  try {
    const rows = await getByProductComarca(req.params.comarca);
    res.json(rows);
} catch (error) {
    res.json({ error: error.message });
}


})

module.exports = router;