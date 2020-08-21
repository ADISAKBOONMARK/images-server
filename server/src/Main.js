//= ================= [START Import Modules] =================//
import { APP_CONFIG } from './AppConfig';
import { SERVER, API_PATH, LOG, APP, EXPRESS, PATH, ROOT_PATH } from './MainProperty';

import MiddlewareController from './Controllers/MiddlewareController';

import ImageController from './Controllers/Image/ImageController';
//= ================= [END Import Modules] =================//

async function start() {
    //= ================= [START Node Server] =================//
    const log = LOG;

    if (APP_CONFIG.ENABLE_SSL === true) {
        const domain = APP_CONFIG.DOMAIN;
        const host = APP_CONFIG.HOST;
        const port = APP_CONFIG.PORT_HTTPS;

        await SERVER.listen(port, host);

        log.info('Is Secure => Running Port No. at https://' + domain + ':' + port);
        log.debug('Full path => ' + API_PATH);
    } else {
        const domain = APP_CONFIG.DOMAIN;
        const host = APP_CONFIG.HOST;
        const port = APP_CONFIG.PORT_HTTP;

        await SERVER.listen(port, host);

        log.info('Is not Secure => Running Port No. at http://' + domain + ':' + port);
        log.debug('Full path => ' + API_PATH);
    }
    //= ================= [END Node Server] =================//

    //= ================= [START Init Middleware Controller] =================//
    await new MiddlewareController().setController();
    //= ================= [END Init Middleware Controller] =================//

    //= ================= [START Init Controller] =================//
    await new ImageController().setController();
    //= ================= [END Init Controller] =================//

    //= ================= [START Public Path] =================//
    APP.use('/image', EXPRESS.static(PATH.join(ROOT_PATH + '/../images')));
    //= ================= [END Public Path] =================//
}

start();
