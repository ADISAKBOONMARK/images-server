# Images Server (BE web APIs)
The application will be the back-end to provide APIs services. Used to manage the image files.

## Required Software
1. Node Js [Download](https://nodejs.org/en/)

## Required IDE
1. visual studio code (VSCode) [Download](https://code.visualstudio.com/)
  **extenstion**
    - Prettier [Download](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
    - Eslint [Download](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
    - Gitlens [Download](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens)

## Download 
```bash
$ git clone https://github.com/ADISAKBOONMARK/images-server.be-webapi.git
```

## Installation 
```bash
# Install node module of the server.
$ cd images-server.be-webapi/server
$ npm install
$ cd images-server.be-webapi/server/src
$ npm install
$ cd images-server.be-webapi/server/api-docs
$ npm install
$ cd images-server.be-webapi/server/test-ui-report
$ npm install
```

## Command

#### Start Server
```bash
$ cd images-server.be-webapi/server
$ npm run start
```

#### Test Server
```bash
$ cd images-server.be-webapi/server
$ npm run test

#You can view the interface test report with the below command.
$ npm run test-ui-report
```

#### Start APIs Document
```bash
$ cd images-server.be-webapi/server
$ npm run api-docs
```

#### Build Server
```bash
$ cd images-server.be-webapi/server
$ npm run build

#You can run the server with the file build.js.
$ node build.js

#If error this case "Error: Cannot find module 'express' " or similar case.
$ npm init
$ npm install express
...

#Run the build.js again.
$ node build.js
```
