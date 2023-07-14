const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/biblioteca', { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => console.log('Se ha conectado la base de datos.'))
    .catch(e => console.log('Ha ocurrido un error.', e));

const LibroSchema = new mongoose.Schema({
    titulo: String,
    autor: String
}, { collection: 'libros' });

const Libro = mongoose.model('Libro', LibroSchema);

module.exports = Libro;