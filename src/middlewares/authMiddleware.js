//src/middlewares/authMiddleware.js
const jwt = require("jsonwebtoken");

module.exports = (req,res,next) =>{
    const authHeader = req.headers["authorization"];

    if(!authHeader)
        return res
        .status(403)
        .send({auth:false,message:"No se proveyó un token"});
    const token = authHeader.split(" ")[1];
    if(!token)
        return res.status(403).send({auth:false,message:"Malformed token"});

    jwt.verify(token, process.env.TOKEN_SECRET, (error, decoded) => {
        if (error) {
            console.error("Error de verificación de token:", error); // Añadir registro de error
            return res.status(500).send({ auth: false, message: "Token inválido" });
        }
        req.userId = decoded.usuario;
        next();
    });
    
};