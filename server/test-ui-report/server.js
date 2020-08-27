const path = require('path');

const express = require('express');
const app = express();
const server = require('http').createServer(app);

const host = '0.0.0.0';
const domain = 'localhost';
const port = 8091;

server.listen(port, host);

app.use('/coverage', express.static(path.join(__dirname, '../test-report/coverage/lcov-report')));
app.use('/mochawesome', express.static(path.join(__dirname, '../test-report/result')));
app.use('/test-resullt', express.static(path.join(__dirname, '../test-report/test-resullt.xml')));

console.log('Coverage running at http://' + domain + ':' + port + '/coverage');
console.log('Mochawesome running at http://' + domain + ':' + port + '/mochawesome');
console.log('Test Resullt running at http://' + domain + ':' + port + '/test-resullt');
