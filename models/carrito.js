//!TBI
const createTbi = (fk_producto, idUsuario) => {
  return new Promise((resolve, reject) => {
    //Query probada ok
    db.query(
      "INSERT INTO tbi_usuarios_productos (fk_producto, fk_usuario) values (?, ?)",
      [fk_producto, idUsuario],
      (error, result) => {
        if (error) reject(error);
        resolve(result);
      }
    );
  });
};
module.exports = {
  createTbi,
};
