
//1
const router = require("express").Router();
 const bcrypt = require("bcryptjs");
2//
const jwt= require('jsonwebtoken');
const dayjs= require('dayjs')

const {create, getByEmail}= require('../../models/usuario')

//! ruta post-- registro

router.post("/registro", async (req, res) => {
    try {


      //valor del usuario que se ha registrado

      console.log(req.user);
   //comprobar si el email ya existe
   req.body.contraseña = bcrypt.hashSync(req.body.contraseña, 10);
  
      const result = await create(req.body);
      res.json(result);

    } catch (error) {
      res.json({ error: error.message });
    }
  });

//2

//!ruta post-login

router.post('/login', async (req, res) => {
  
  const{email,contraseña}= req.body;

  try {
    const usuario = await getByEmail(email);
    if (!usuario) {
      // Si no existe el usuario a partir de ese email, muestro el error
      return res.json({ error: "Error en email y/o contraseña" });
    }

    // Comprobamos que la password coincide
    // console.log(password, usuario.password)
    const iguales = bcrypt.compareSync(contraseña, usuario.contraseña);
    if (!iguales) {
      return res.json({ error: "Error en email y/o contraseña" });
    }

    
      //!del método createToken
      console.log(createToken(usuario));
      res.json({
           success: 'LOGIN CORRECTO!!!',
           token: createToken(usuario) });
     
   
  } catch (error) {
    res.json({ error: error.message });
  }
});

  // console.log(email,password)



  function createToken(pUsuario) {
    const obj = {
      usuarioId: pUsuario.id,
      caducidad: dayjs().add(24, "hours").unix(),
              //?otros datos a sacar del token
      nombreUsuario:pUsuario.nombre,
      nombreApellidos:pUsuario.apellidos,
    }   
    
    //genera el token      //llave para encriptar/desencriptar token       
     return jwt.sign(obj, process.env.SECRET_KEY);

    console.log(obj)
  }

  // instalar npm install jsonwebtoken
  // npm install dayjs


module.exports = router;

