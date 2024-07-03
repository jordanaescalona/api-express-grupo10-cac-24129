//src/routes/authRoutes.js
const express = require("express");
const router = express.Router();

const controller = require('../controllers/authController');
//creo ruta protegida para la autenticación
//utilizo authMiddleware
const authMiddleware = require("../middlewares/authMiddleware");

//voy a hacer las rutas de register, auth y login
router.post('/register', controller.register);
router.post('/login', controller.login);

//Ruta protegida para probar autenticación
router.get("/protected",authMiddleware,(req,res) => {
    console.log(req.body);
    res.status(200).send(`Hola User ${req.body.usuario}`);
});



module.exports = router;