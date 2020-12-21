//*1/2   -by default
const router = require('express').Router();



//!3 
const apiUsuariosRouter= require('./api/usuarios');
const apiProductoresRouter= require('./api/productores');
const apiProductosRouter= require('./api/productos');
//! TBI
const apiCarritosRouter= require('./api/carritos');

//!4
router.use('/usuarios', apiUsuariosRouter);
router.use('/productores',apiProductoresRouter);
router.use('/productos', apiProductosRouter);
//! TBI
router.use('/carrito',apiCarritosRouter)


//2/2  -by default
module.exports = router;