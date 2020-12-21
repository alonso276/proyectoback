
//!método create --registro productor---
const create = ({ nombre_empresa, provincia, comarca, municipio, actividad, direccion_produccion, lat, lon, email_empresa, telefono_empresa, fecha_alta, imagen, comentario }, idUsuario) => {
    console.log(idUsuario)
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO productores (nombre_empresa, provincia, comarca, municipio, actividad, direccion_produccion,lat,lon, email_empresa, telefono_empresa,  fecha_alta, imagen, comentario, fk_usuario) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [nombre_empresa, provincia, comarca, municipio, actividad, direccion_produccion, lat, lon, email_empresa, telefono_empresa, new Date(), imagen, comentario, idUsuario],
            (error, result) => {
                console.log(error)
                if (error) reject(error);
                resolve(result);
            }
        );
    });
};

//!método que actualiza el campo productor de la tabla usuarios de 0(false) a 1(true)
const update = (pId) => {
    return new Promise((resolve, reject) => {
        db.query('UPDATE usuarios SET usuarios.productor = 1 WHERE usuarios.id = ?', [pId], (error, rows) => {
            if (error) reject(error);
            resolve(rows);
        });
    });
}

    //!método getALL fk productor vs user???// where id is ?
    const getAll = () => {
        return new Promise((resolve, reject) => {
          // antigua query   'SELECT p.*, pro.categoria FROM productos as pro, productores as p WHERE fk_productor=p.fk_usuario'
          db.query(
            'SELECT * from productores',
            (error, rows) => {
              if (error) reject(error);
              resolve(rows);
            }
          );
        });
    };

    


    const getComarca = () => {
        return new Promise((resolve, reject) => {
            db.query('select productores.comarca from productores', (error, rows) => {
                if (error) reject(error);
                resolve(rows);
            });
        });
    };


    const getByComarca = (pComarca) => {
        return new Promise((resolve, reject) => { //?changed to fk_usuario

            // select p.*, pro.categoria from productores as p, productos as pro where p.comarca=? and pro.fk_productor=p.id

            // antigua query 'select * from productores where productores.comarca = ?'
            db.query(
              'select * from productores where productores.comarca = ?',
              [pComarca],
              (error, rows) => {
                if (error) reject(error);
                if (rows.length === 0) resolve(null);
                resolve(rows);
              }
            );
        });
    }


    const getMunicipio = (pMunicipio) => {
        return new Promise((resolve, reject) => {
            
            db.query('select productores.municipio from productores',  (error, rows) => {
                console.log(rows)
                if (error) reject(error);
                if (rows.length === 0) resolve(null);
                resolve(rows);
            });
        });
    }
    const getByMunicipio=(pMunicipio)=> {
        return new Promise((resolve, reject) => {
            
            db.query('select * from productores where productores.municipio = ?', [pMunicipio], (error, rows) => {
                if (error) reject(error);
                if (rows.length === 0) resolve(null);
                resolve(rows);
            });
        });
    }

    
    // nueva query 2012
    // const getByCategory = (pCategoria) => {
      //console.log(pCategoria);
      // return new Promise((resolve, reject) => {
        //Antigua Query 'SELECT p.* FROM productores AS p, productos AS pro WHERE pro.fk_productor = p.id AND pro.categoria = ?'
        //Antigua Query 'SELECT p.* , pro.categoria FROM productores AS p, productos AS pro WHERE pro.fk_productor = p.id AND pro.categoria = ?'
        //Antigua Query 'SELECT p.* , pro.categoria FROM productores AS p, productos AS pro WHERE pro.fk_productor = p.fk_usuario AND pro.categoria = ?'
    //     db.query(
    //       'SELECT productores.* FROM productores INNER JOIN productos ON productores.fk_usuario = productos.fk_productor AND productos.categoria = ? GROUP BY productores.fk_usuario',
    //       [pCategoria],
    //       (error, rows) => {
    //         if (error) reject(error);
    //         if (rows.length === 0) resolve(null);
    //         resolve(rows);
    //       }
    //     );
    //   };
    // };

//  antigua query get by category

    const getByCategory=(pCategoria) =>{

      return new Promise((resolve,reject)=>{
            // dejar comentado
            // antigua query SELECT p.* FROM productores AS p, productos AS pro WHERE pro.fk_productor = p.id AND pro.categoria = ? 
            // "SELECT p.*, pro.categoria FROM productores AS p, productos AS pro WHERE pro.fk_productor= p.fk_usuario AND pro.categoria = ?";
            // fin dejar comentado

          db.query('SELECT p.* FROM productores AS p, productos AS pro WHERE pro.fk_productor = p.fk_usuario AND pro.categoria = ?',[pCategoria], (error, rows) => {
      if (error) reject(error);
                if (rows.length === 0) resolve(null);
                resolve(rows);
            });
        });
        
    }

    //!testing comprobar si productor existe
    // const getByPerfil = (pPerfil) => {
    //     return new Promise((resolve, reject) => {
    //         db.query('select p.perfil from productores as p where perfil=?',[pPerfil], (err, rows) => {
    //             if (err) reject(err);
    //             if (rows.length === 0) resolve(null);
    //             resolve(rows[0]);
    //         });
    //     });
    // }


    //? not sure if working 
//! lo recibimos en front mediante click--> el pProductorId

const getProductorRegistro = (idUsuario) => {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT u.productor FROM usuarios AS u WHERE u.id = ?",
      [idUsuario],
      (error, rows) => {
        if (error) reject(error);
        if (rows.length === 0) resolve(null);
        resolve(rows);
      }
    );
  });
};
   
    module.exports= {

        create, update, getAll,getComarca, getByComarca,getByCategory,getMunicipio,getByMunicipio, getProductorRegistro}