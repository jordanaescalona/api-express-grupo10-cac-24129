require('dotenv').config();
const express = require("express");
const app = express();

const path = require("path");
//utilizo rutas absolutas
app.use(express.static(path.join(__dirname + "/public")));

//cuando envío una peticion con un cuerpo json
//me lo transforma y me lo deja disponible en el req.body
app.use(express.json());

//agrego rutas de productos
const productosRouter = require("./src/routes/productos.router");
//le digo a la aplicacion que use esa ruta
app.use("/productos",productosRouter);
//utilizo rutas relativas
app.get("/",(req,res) => {
	res.send("hola desde express");
});
//ruta parametrizada
app.get('/productos/:id',(req,res) => {
    console.log(req.params.id);
	res.send("Producto:"+req.params.id);
}); 

//Rutas de peliculas
const peliculasRouter = require("./src/routes/moviesRouter");
app.use("/peliculas",peliculasRouter);

//Rutas de autenticación
const authRouter = require("./src/routes/authRoutes");
app.use("/auth",authRouter);

const PORT = process.env.PORT || 3001;
app.listen(PORT,() => console.log(`http://localhost:${PORT}`));
