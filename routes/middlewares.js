const jwt = require('jsonwebtoken');
const dayjs = require('dayjs');
const usuario = require('../models/usuario');

const{getById}= require('../models/usuario');
// const { getByPerfil } = require('../models/productor');



//middelwarepara el token

const checkToken = async (req, res, next) => {

    // console.log('pasa por el token')

    // if (process.env.MIDDLEWARE_ACTIVE === 'OFF') {
    //     return next();
    // }

    // Comprobar si el token viene en las cabeceras de la petición
    if (!req.headers['authorization']) {
        return res.status(403).json({ error: 'Necesitas la cabecera Authorization' });
        
    }


   //Comprobar si el token es correcto
    const token = req.headers['authorization'];

    const obj = jwt.decode(token,process.env.SECRET_KEY);
       //obj--> usuarioId, caducidad,iat
    if (!obj) {
        return res.status(403).json({ error: 'El token es incorrecto' });
        
    }
        // console.log(obj)

        // Comprobar si ha caducado
    if (dayjs().unix() > obj.caducidad) {
        return res.status(403).json({ error: 'El token está caducado' });
    }



        //Comprobar si el usuario existe

     const usuario= await getById(obj.usuarioId);
        console.log(usuario)
     if(!usuario){
       

        return res.status(403).json({ error: 'El usuario no existe '});
     }

     req.user=usuario;
    

     next();

    }
    
//!funciona no tocar
const UsuarioPerfil = (req, res, next) => {

       
        if (req.user.productor !== 1) {
            res.status(403).json({ error: 'Debes ser productor para rellenar este formulario' });
        }

        next();
}


//!testing productor perfil middleware
// const ProductorPerfil = (req, res, next) => {

       
//     if (req.productor.perfil !=='productor' ) {
//         res.status(403).json({ error: 'Debes ser productor para rellenar este formulario' });
//     }
   
// }
 //!testing comprobar si el productor existe

//  const productor= await getByPerfil(obj.productorPerfil);
       
//  if(!productor){
   

//     return res.status(403).json({ error: 'El productor no existe '});
//  }

//  req.productor=productor;

 
//  next();

   //todo crear un middleware para rol de admin en eventos calendario
    // const adminRole = (req, res, next) => {

        // if (process.env.MIDDLEWARE_ACTIVE === 'OFF') {
        //     return next();
        // }
        //todo role de admin
        // if (req.user.role !== 'ADMIN') {
        //     res.status(403).json({ error: 'Debes tener permisos de administración' });
        // }
        // next();
// }


    module.exports={checkToken, UsuarioPerfil}