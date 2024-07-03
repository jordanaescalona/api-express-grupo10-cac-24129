//src/routes/moviesRouter.js
const express = require('express');
const router = express.Router();

//voy a llamar a todas las funciones para responder a las rutas
const controller = require('../controllers/moviesController');

/* ------MÉTODO GET------ */
router.get('/', controller.getAllMovies);
router.get('/:idPelicula', controller.getMovieById);

/* ------MÉTODO POST ------- */
router.post('/', controller.createMovie);

/* -----MÉTODO PUT-------- */
router.put('/:idPelicula', controller.updateMovie);

/* -----MÉTODO DELETE------ */
router.delete('/:idPelicula', controller.deleteMovie);


//El módulo es privado, debo exponer lo que quiero mostrar
module.exports = router;
