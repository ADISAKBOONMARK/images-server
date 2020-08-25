import { IMAGES_PATH, PATH, FS } from './MainProperty.test';

import ImageService from './Services/Image/ImageService.test';
import ImageModel from './Models/Image/ImageModel.test';

async function start() {
    //= ================ Remove images test ============//
    const imagesTestDir = PATH.join(IMAGES_PATH + '/test');

    const deleteFolderRecursive = function (path) {
        if (FS.existsSync(path)) {
            FS.readdirSync(path).forEach((file, index) => {
                const curPath = PATH.join(path, file);
                if (FS.lstatSync(curPath).isDirectory()) {
                    // recurse
                    deleteFolderRecursive(curPath);
                } else {
                    // delete file
                    FS.unlinkSync(curPath);
                }
            });
            FS.rmdirSync(path);
        }
    };

    await deleteFolderRecursive(imagesTestDir);
    //= ===============================================//

    //= ================ Run unit-test ================//
    ImageService.runTest();
    ImageModel.runTest();
    //= ===============================================//

    //= ================ End process ================//
    setInterval(function () {
        process.exit();
    }, 1000);
    //= ===============================================//
}

start();
