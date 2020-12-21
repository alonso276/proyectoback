const create=({nombre,apellidos,email,contraseña,direccion,telefono,perfil}) =>{


    return new Promise((resolve,reject)=>{
    
          db.query(
            'INSERT INTO usuarios(nombre,apellidos,email,contraseña,direccion,fecha_inscripcion,telefono,perfil,productor,role)values(?,?,?,?,?,?,?,?,?,?)',
           [nombre,apellidos,email,contraseña,direccion,new Date(),telefono,perfil,0,'NONE'],
           (error,result)=>{
               if(error) reject(error)
    
               resolve(result)
    
            }
            );
        });
    
    }


    const getByEmail = (pEmail) => {
        return new Promise((resolve, reject) => {
            db.query('select * from usuarios where email = ?', [pEmail], (err, rows) => {
                if (err) reject(err);
                if (rows.length !== 1) resolve(null); // El email debe ser único
                resolve(rows[0]);
            });
        });
    }


    //!para el middleware-comprobar si usuario existe
    const getById = (pUsuarioId) => {
        return new Promise((resolve, reject) => {
            db.query('select * from usuarios where id = ?', [pUsuarioId], (err, rows) => {
                if (err) reject(err);
                if (rows.length === 0) resolve(null);
                resolve(rows[0]);
            });
        });
    }


    

    module.exports= {

        create, getByEmail,getById
    }