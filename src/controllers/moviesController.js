//src/controllers/moviesController.js
//requerimos la conexión a la base de datos.
const db = require("../config/db");

const getAllMovies = (req, res) => {
    //consulta a la base de datos
    const sql = "SELECT * FROM pelicula";
    //ejecutamos
    db.query(sql, (error, rows) => {
        if (error) {
            return res.status(500).json({ error: "Intente mas tarde" });
        }
        res.json(rows);
    });

};

const getMovieById = (req, res) => {
    //Método desestructuración, obtiene id de un objeto con {id}
    const { idPelicula } = req.params;
    //consulta a la base de datos
    const sql = "SELECT * FROM pelicula WHERE idPelicula = ?";
    //ejecutamos
    db.query(sql, [idPelicula], (error, rows) => {
        if (error) {
            return res.status(500).json({ error: "Intente mas tarde" });
        }

        //debo mostrarle un mensaje en caso de que no encuentre ningún elemento con ese id
        if (rows.length <= 0) {
            return res.status(404).json({ error: "No se encontró la película" });
        }
        res.json(rows[0]);
    });
};

const createMovie = (req, res) => {
    //obtenemos los datos del body
    const { nombre, genero, duracion, director, descripcion, imagen } = req.body;

    // Función de validación
    function isString(value) {
        return typeof value === 'string' && value.trim() !== '';
    }

    function isNumber(value) {
        return !isNaN(value);
    }

    // Validamos los datos
    if (!isString(nombre) || !isString(duracion) || !isString(director) || !isString(descripcion) || !isString(imagen)) {
        return res.status(400).json({ error: "Todos los campos deben ser texto excepto el género, que debe ser un número." });
    }

    if (!isNumber(genero)) {
        return res.status(400).json({ error: "El campo género debe ser un número." });
    }
    //consulta a la base de datos
    const sql = "INSERT INTO pelicula (nombre, genero, duracion, director, descripcion, imagen) VALUES (?,?,?,?,?,?)";
    //ejecutamos
    db.query(sql, [nombre, genero, duracion, director, descripcion, imagen], (error, result) => {
        if (error) {
            return res.status(500).json({ error: "Intente mas tarde" });
        }
        // si la inserción es exitosa, obtenemos la película recién insertada usando el ID generado
        const insertedId = result.insertId;

        // responder con la película recién agregada, usando spread operator
        const addedMovie = { idPelicula: insertedId, ...req.body };
        return res.status(200).json(addedMovie);
    });
};

const updateMovie = (req, res) => {
    //Recibo identificador
    const { idPelicula } = req.params;
    console.log(req.params);
    console.log(req.body);
    //Recibo datos del body
    const { nombre, genero, duracion, director, descripcion, imagen } = req.body;
    //Función de validación
    function isString(value) {
        return typeof value === 'string' && value.trim() !== '';
    }
    function isNumber(value) {
        return !isNaN(value);
    }
    //Validamos los datos
    if (!isString(nombre) || !isString(duracion) || !isString(director) || !isString(descripcion) || !isString(imagen)) {
        return res.status(400).json({ error: "Todos los campos deben ser texto excepto categoria" });
    }
    if (!isNumber(genero)) {
        return res.status(400).json({ error: "El campo categoria debe ser un número." });
    }
    //consulta a la base de datos
    const sql = "UPDATE pelicula SET nombre = ?, genero = ?, duracion = ?, director = ?, descripcion = ?, imagen = ? WHERE idPelicula = ?";
    //ejecutamos
    db.query(sql, [nombre, genero, duracion, director, descripcion, imagen, idPelicula], (error, result) => {
        if (error) {
            return res.status(500).json({ error: "Intente mas tarde" });
        }
        //si no se afectó ninguna fila
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "No se encontró la película" });
        }
        //si la inserción es exitosa, obtenemos la película recién insertada usando el
        //ID generado
        const updatedMovie = { idPelicula: idPelicula, ...req.body };
        return res.status(200).json(updatedMovie);
    });

};

const deleteMovie = (req, res) => {
    //obtenemos id de la pelicula
    const { idPelicula } = req.params;
    //consulta a la base de datos
    const sql = "DELETE FROM pelicula WHERE idPelicula = ?";
    //ejecutamos
    db.query(sql, [idPelicula], (error, result) => {
        if (error) {
            return res.status(500).json({ error: "Intente mas tarde" });
        }
        //si no se afectó ninguna fila
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "No se encontró la película" });
        }
        //si la inserción es exitosa, obtenemos la película recién insertada usando el
        //ID generado
        return res.status(200).json({ idPelicula: idPelicula ,message:"Pelicula eliminada exitosamente!."});
    });

};
//exportamos el módulo como un objeto
module.exports = {
    getAllMovies,
    getMovieById,
    createMovie,
    updateMovie,
    deleteMovie,

};