//src/models/userModel.js
const db = require('../config/db');

const createUser = (user, callback) => {
  db.query('INSERT INTO usuario SET ?', user, callback);
  
};

const findUserByUsuario = (usuario, callback) => {
    db.query('SELECT * FROM usuario WHERE usuario = ?', [usuario], (error, results) => {
        console.log("Resultados de la búsqueda de usuario:", results);
        if (error){
          return callback(error,null);
        } 
        if (results.length === 0){
          return callback(null, null);
        } 
        callback(null, results[0]);
    });
  };
  
  module.exports = {
    createUser,
    findUserByUsuario
  };
