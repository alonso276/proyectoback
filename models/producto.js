
// ? const express= require('express')

const productor = require("./productor");


const create = (
  { categoria, nombre, cantidad, precio, certificado, imagen },
  idUsuario) => {
  //? upload multer????????
  //   const upload=multer({dest:'public/images' })

  return new Promise((resolve, reject) => {
    db.query(
      "INSERT INTO productos(categoria,nombre,cantidad,precio,certificado,imagen,fk_productor)values(?,?,?,?,?,?,?)",
      [categoria, nombre, cantidad, precio, certificado, imagen,idUsuario],
      (error, result) => {
        if (error) reject(error);

        resolve(result);
      }
    );
  });
};

      //!método getALL
      const getAll = () => {
        return new Promise((resolve, reject) => {
            //Antigua Query 'SELECT * FROM productos'
            db.query('SELECT pro.*, p.nombre_empresa AS productor, p.comentario AS descripcion  FROM productos AS pro, productores AS p WHERE pro.fk_productor= p.fk_usuario', (error, rows) => {
                if (error) reject(error);
                resolve(rows);
            });
        });
    };

    


     //!método para obtener las categorías de productos en el select
     const getCategory = () => {
        return new Promise((resolve, reject) => {
            db.query('SELECT productos.categoria FROM productos', (error, rows) => {
                if (error) reject(error);
                resolve(rows);
            });
        });
    };
    
//!método para obtener las categorías de productos
    const getByCategory = (pCategoria) => {
      return new Promise((resolve, reject) => {
        //Antigua Query 'SELECT * FROM productos WHERE productos.categoria = ?'
        db.query("SELECT pro.*, p.nombre_empresa AS productor, p.comentario AS descripcion FROM productos AS pro, productores AS p WHERE pro.fk_productor = p.fk_usuario AND pro.categoria = ?",[pCategoria],(error, rows)=>{
            if (error) reject(error);
            if (rows.length === 0) resolve(null);
            resolve(rows);
          }
        );
      });
    };


//!método para mostrar los productos de un mismo productor
const getByProductorId = (pProductorfkUsuario) => {
    return new Promise((resolve, reject) => {
        //Antigua Query 'SELECT pro.* FROM productos AS pro, productores AS p  WHERE pro.fk_productor = p.id AND pro.fk_productor = ?'
        db.query('SELECT pro.*, p.nombre_empresa AS productor, p.comentario AS descripcion FROM productos AS pro, productores AS p  WHERE pro.fk_productor = p.fk_usuario AND pro.fk_productor = ?', [pProductorfkUsuario], (error, rows) => {
            if (error) reject(error);
            if (rows.length === 0) resolve(null);
            resolve(rows);
        });
    });
};


//!método para mostrar los productos por comarca


    const getByProductComarca = (pComarca) => {
        return new Promise((resolve, reject) => {
            //Antigua Query 'SELECT pro.* FROM productos AS pro, productores AS p WHERE pro.fk_productor = p.id AND p.comarca = ?'
            db.query('SELECT pro.*, p.nombre_empresa AS productor, p.comentario AS descripcion FROM productos AS pro, productores AS p WHERE pro.fk_productor = p.fk_usuario AND p.comarca = ?', [pComarca], (error, rows) => {
                if (error) reject(error);
                if (rows.length === 0) resolve(null);
                resolve(rows);
            });
        });
    };

    module.exports= {

        create, getAll,getCategory,getByCategory,getByProductorId, getByProductComarca
    }