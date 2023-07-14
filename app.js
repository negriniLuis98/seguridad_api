const librosRouter = require('./routes/librosRouter.js');
const errorHandler = require('./middlewares/errorHandler.js');

const express = require('express');
const app = express();

const { auth } = require('express-oauth2-jwt-bearer');
const authentication = auth({
    audience: 'http://localhost:3000/api/productos',
    issuerBaseURL: 'https://dev-utn-frc-iaew.auth0.com/',
    tokenSigningAlg: 'RS256'
});

app.use(express.json());

app.use('/v1/libros', authentication, librosRouter);
app.use(errorHandler);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Conectado en http://localhost:${3000}/v1/libros/`));