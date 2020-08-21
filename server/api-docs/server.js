const express = require('express');
const app = express();
const server = require('http').createServer(app);

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const host = '0.0.0.0';
const domain = 'localhost';
const port = 8081;

const options = {
    customCss: '.swagger-ui .topbar { display: none }',
};

server.listen(port, host);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));

console.log('Swagger running at http://' + domain + ':' + port + '/api-docs');
