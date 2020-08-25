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
$ git clone https://github.com/ADISAKBOONMARK/images-server.git
```

## Installation 
```bash
# Install node module of the server
$ cd images-server/server
$ npm install
$ cd images-server/server/src
$ npm install
$ cd images-server/server/api-docs
$ npm install
```

## Command

#### Start Server
```bash
$ cd images-server/server
$ npm run start
```

#### Unit-Test Server
```bash
$ cd images-server/server
$ npm run unit-test
```

#### Start APIs Document
```bash
$ cd images-server/server
$ npm run api-docs
```

#### Build Server
```bash
$ cd images-server/server
$ npm run build

#You can run app with the build.js
$ node build.js

#If error (Error: Cannot find module 'express') 
$ npm init
$ npm install express
...

#Run the build.js again
$ node build.js
```
