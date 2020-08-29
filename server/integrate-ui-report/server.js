const path = require('path');

const express = require('express');
const app = express();
const server = require('http').createServer(app);

const host = '0.0.0.0';
const domain = 'localhost';
const port = 8092;

server.listen(port, host);

app.use('/extra', express.static(path.join(__dirname, '../integrate-report/extra.html')));
app.use('/paper', express.static(path.join(__dirname, '../integrate-report/paper.html')));
app.use('/junit', express.static(path.join(__dirname, '../integrate-report/junit.xml')));

console.log('Extra running at http://' + domain + ':' + port + '/extra');
console.log('Paper running at http://' + domain + ':' + port + '/paper');
console.log('Junit running at http://' + domain + ':' + port + '/junit');
