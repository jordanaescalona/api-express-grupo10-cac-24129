const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const userModel = require('../models/userModel');

const register = (req, res) => {
    try {
        const { usuario, nombre, apellido, email, password } = req.body;
        const hash = bcrypt.hashSync(password, 8);
        console.log("Contraseña hasheada:", hash);
        const newUser = {
            usuario,
            nombre,
            apellido,
            email,
            password: hash,
            administrador: 0
        };

        userModel.createUser(newUser, (error, result) => {
            if (error) {
                res.status(500).json({ message: error.message });
            } else {
                const token = jwt.sign({ idUsuario: result.idUsuario }, process.env.TOKEN_SECRET, {
                    expiresIn: process.env.TOKEN_EXPIRATION
                });
                res.status(201).json({ auth: true, token: token });
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const login = (req, res) => {
    const { usuario, password } = req.body;
    console.log("Datos recibidos:", req.body);
    userModel.findUserByUsuario(usuario, (error, user) => {
        if (error || !user) {
            return res.status(404).send("Usuario no encontrado.");
        }
        console.log("Usuario encontrado:", user);
        console.log("Contraseña ingresada:", password);
        console.log("Contraseña almacenada:", user.password);

        //Validar la contraseña
        bcrypt.compare(password,user.password,(err,result) =>{
            if(err){
                console.error("Error al comparas contraseñas:",err);
                return res.status(500).send("Error en la validación de la contraseña.");
            }
            console.log("contraseña válida?:",result);
            if (!result) {
                console.log("Contraseña inválida.");
                return res.status(401).send({ auth: false, token: null });
            }

            const token = jwt.sign({ idUsuario: user.idUsuario }, process.env.TOKEN_SECRET, {
                expiresIn: process.env.TOKEN_EXPIRATION
            });
            console.log("Token generado:", token);
            res.status(200).send({ auth: true, token: token });

        });
        /* const passwordIsValid = bcrypt.compareSync(password, user.password);
        console.log("¿Contraseña válida?:", passwordIsValid);

        if (!passwordIsValid) {
            console.log("Contraseña inválida.");
            return res.status(401).send({ auth: false, token: null });
        }
        const token = jwt.sign({ idUsuario: user.idUsuario }, process.env.TOKEN_SECRET, {
            expiresIn: process.env.TOKEN_EXPIRATION
        });
        console.log("Token generado:", token);
        res.status(200).send({ auth: true, token: token }); */
    });

};



module.exports = {
    register,
    login,
};