//1
const router = require("express").Router();
const {create,update,getAll,getComarca, getByComarca, getByCategory, getMunicipio,getByMunicipio, getProductorRegistro}= require('../../models/productor')
const { checkToken } = require('../middlewares');

//? node geocoder
const NodeGeocoder = require('node-geocoder');

const options = {
  provider: 'google',
  apiKey: 'AIzaSyBXoe3vvdGGosbpLVZqUncQDgiW4UAbl58',
  formatter: null 
};
const geocoder = NodeGeocoder(options);
//?multer

const multer=require('multer');
const upload = multer({ dest: "public/images" });
const fs= require('fs');
const { isPartiallyEmittedExpression } = require("typescript");




/////////COMIENZO DE RUTAS //////////


//!productores--registro !!! AQUÍ AÑADO EL MIDDLEWARE 
                          //?middleware de multer pload.single('imagen')

                          // middlewarechecktoken eliminado temporalmente

router.post('/registro',checkToken,upload.single('imagen'), async (req, res) => {
  // console.log(req.file);
  //1.console.log(req.user)->devuelve id del usuario
  //2.A create le paso req.body y req.user.id -> create en productor.js
  //3.A updateUsuario le paso req.user.id -> updateUsuario en productor.js

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

    //?node geocoderfunción transformar dirección en lat long

    const geocoding = await geocoder.geocode(req.body.direccion_produccion);

    // console.log(geocoding)

    req.body.lat = geocoding[0].latitude;
    req.body.lon = geocoding[0].longitude;

    console.log(req.body);

    const result = await create(req.body, req.user.id);
    console.log(result)
    const result2 = await update(req.user.id);
    console.log(result2);
    res.json({ result, result2 });
  } catch (error) {
    console.log(error)
    res.json({ error: error.message });
  }
});

  //!productores getAll

  router.get('/all',async (req, res) => {

    // Valor del usuario que ha hecho login
    // console.log(req.user);

    try {
        const rows = await getAll();
        res.json(rows);
    } catch (error) {
        res.json({ error: error.message });
    }
});

//!ruta getComarca

router.get('/comarca', async (req, res) => {

  // Valor del usuario que ha hecho login
  // console.log(req.user);

  try {
      const rows = await getComarca();
      res.json(rows);
  } catch (error) {
      res.json({ error: error.message });
  }
});

//!ruta getByComarca--- :comarca

router.get('/com/:comarca', async(req,res)=> {

  try {
    const rows = await getByComarca(req.params.comarca);
    res.json(rows);
} catch (error) {
    res.json({ error: error.message });
}

})

//!ruta getByCategoria-- :categoria

router.get('/cat/:categoria', async(req,res)=> {
  // console.log(req.params)
  try {
   
    const rows = await getByCategory(req.params.categoria);
          console.log(rows)

         const uniqueObjects = [
          
           ...new Map(rows.map((item) => [item.id, item])).values(),
         ]; 
           
           res.json(uniqueObjects);
  
       } catch (error) {
    res.json({ error: error.message });
}

})



//!ruta get Municipio
router.get('/municipio', async (req, res) => {

  try {
      const rows = await getMunicipio();
      res.json(rows);
  } catch (error) {
      res.json({ error: error.message });
  }
});


//!ruta getByMunicipio :
router.get('/mun/:municipio', async(req,res)=> {
  // console.log(req.params)
  try {
   
    const rows = await getByMunicipio(req.params.municipio);
    res.json(rows);
 }   catch (error) {
    res.json({ error: error.message });
 }

})

//!comprobar si estás registrado como productor para poder introducir productos
router.get("/comprobarRegistro", checkToken, async (req, res) => {
  try {
    const result = await getProductorRegistro(req.user.id);
    res.json(result[0]);
  } catch (error) {
    res.json({ error: error.message });
  }
});


module.exports=router;















