const Libro = require('../models/libroModel.js');

const express = require('express');
const libroRouter = express.Router();

const { requiredScopes } = require('express-oauth2-jwt-bearer');

libroRouter.get('/', requiredScopes('read:libros'), async (req, res) => {
    try {
        const libros = await Libro.find();
        res.json(libros);
    } catch (e) {
        res.status(500).json({ message: 'Error al obtener los libros de la base de datos.' });
    }
});

libroRouter.get('/:id', requiredScopes('read:libros'), async (req, res) => {
    try {
        const { id } = req.params;
        const libro = await Libro.findById(id);
        res.json(libro);
    } catch (e) {
        res.status(500).json({ message: `Error al obtener libro de id "${id}" de la base de datos.` });
    }
});

libroRouter.post('/', requiredScopes('write:libros'), async (req, res) => {
    try {
        const nuevoLibro = new Libro(req.body);
        await nuevoLibro.save();
        res.json({ message: 'Se ha cargado con éxito el libro a la base de datos.' });
    } catch (e) {
        res.status(500).json({ message: 'Error al cargar el libro a la base de datos.' });
    }
});

libroRouter.put('/:id', requiredScopes('write:libros'), async (req, res) => {
    try {
        const { id } = req.params;
        const libro = await Libro.findByIdAndUpdate(id, req.body, { new: true });
        res.json(libro);
    } catch (e) {
        res.status(500).json({ message: `Error al actualizar el libro de id ${id} en la base de datos.` });
    }
});

libroRouter.delete('/:id', requiredScopes('write:libros'), async (req, res) => {
    try {
        const { id } = req.params;
        const libro = await Libro.findByIdAndDelete(id);
        res.json(libro);
    } catch (e) {
        res.status(500).json({ message: `Error al eliminar el libro de id ${id} en la base de datos.` });
    }
});

module.exports = libroRouter;