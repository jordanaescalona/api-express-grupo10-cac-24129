const express = require("express");
//creo instancia de un router
const router = express.Router();

const productos = [
	{id:1,nombre:"producto 1",stock:10},
	{id:2,nombre:"producto 2",stock:5},
	{id:3,nombre:"producto 3",stock:15},
];
//Para crear las rutas hacemos
router.get('/',(req,res) => {
    //res.send("Listado de productos");
    //FORMATO JSON
    res.json(productos);
});

//Creo ruta con parámetro dinámico
router.get("/:id",(req,res) => {
	//obtengo valor del id:
	console.log(req.params.id);
	//utilizo find para buscar un elemento
	const producto = productos.find(elemento => elemento.id == req.params.id);
	//pregunto si mi producto no existe
	if (!producto){
		//lo que hago es retornar un status
		return res.status(404).json({error:"No existe el producto"});
	}
    res.json(producto);
});
//creamos método post
//No habria problema que utilicen la misma barra router.get('/',... y router.post('/',...
//ya que son métodos distintos
router.post("/", (req,res) => {
    //console.log(req.body);
    //creamos objeto
    //mi base de datos me da el ida pero en este caso hago esto de forma experimental
	const producto = {		
		id:productos.length + 1,
		nombre: req.body.nombre,
		stock: req.body.stock,
	};
	//agregamos elemento a la lista
	productos.push(producto);
	
    //Respondemos con un status
    //lo agrego antes del res.send(producto) ya que sino me muestra un 200
	res.status(201).send(producto);
    //devolvemos dato que insertamos
	res.send(producto);
    
    
});

/* -----METODO PUT ------------ */
router.put('/:id', (req,res) =>{
    //voy a obtener 2 elementos
    console.log(req.params);
    console.log(req.body);

    //buscamos si existe el elemento
    const producto = productos.find(elemento => elemento.id == req.params.id);
    if (!producto){
        return res.status(404).json({error:"El producto no existe"});
    }
    //modificamos elementos
    producto.nombre = req.body.nombre;
    producto.stock = req.body.stock;
    //Retornamos el producto
    res.send(producto);

});

/* --------Método DELETE --------- */
router.delete('/:id', (req,res) =>{
    //buscamos si existe el elemento
    const producto = productos.find(elemento => elemento.id == req.params.id);
    if (!producto){
        return res.status(404).json({error:"El producto no existe"});
    }
    //eliminamos elemento
    const productoIndex = productos.findIndex(elemento => elemento.id == req.params.id);
    productos.splice(productoIndex,1);
    //Retornamos el producto
    res.json(producto);
    
});
//El módulo es privado, debo exponer lo que quiero mostrar
module.exports = router;