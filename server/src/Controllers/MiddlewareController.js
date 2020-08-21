import { APP, ROOT_URL, MASTER_GEN, LODASH } from '../MainProperty';

import ResultDataProperty from '../BusinessData/Result/ResultData/ResultDataProperty';
import ResponseProperty from '../BusinessData/Response/ResponseProperty';

import LogProvider from '../Providers/Log/LogProvider';

class MiddlewareController {
    async setController() {
        APP.use(ROOT_URL, async function (req, res, next) {
            const checkUrlNotFound = async function (req) {
                let urlNotFound = true;

                for (let i = 0; i < APP._router.stack.length; i++) {
                    const route = APP._router.stack[i].route;

                    if (route && route.path) {
                        if (route.path === req.path || route.path === req.baseUrl + req.path) {
                            urlNotFound = false;
                        }
                    }
                }

                return urlNotFound;
            };

            const checkAuthentication = async function (req) {
                // NOTICE: Use to authentication
                return true;
            };

            // NOTICE: You might want to change these.
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
            res.header('Access-Control-Allow-Headers', 'Content-Type');
            res.setHeader('Content-Type', 'application/json');

            if (req.method === 'OPTIONS') {
                res.status(204).end();
            } else {
                //= ================= [ START Create Session ] ==================//
                res.xSessionId = req.headers['x-session-id'] || (await MASTER_GEN.genXsession());
                res.xRtid = req.headers['x-rtid'] || (await MASTER_GEN.genTid());
                res.xTid = await MASTER_GEN.genTid();

                const session = res.xSessionId + ':' + res.xRtid + ':' + res.xTid;
                const invoke = res.xRtid;
                const identity = res.xTid;
                const method = req.method;
                const cmd = req.path;

                const log = new LogProvider(session, invoke, method, cmd, identity);
                log.summary = await log.summary();
                log.detail = await log.detail();

                log.info('Start Proccess', method, req.originalUrl, '...');
                log.info('Session', session);

                res.log = log;

                let reqParams;
                if (!LODASH.isEmpty(req.query)) {
                    reqParams = req.query;
                } else {
                    if (!LODASH.isEmpty(req.body)) {
                        reqParams = req.body;
                    } else {
                        reqParams = 'have no data';
                    }
                }

                log.debug('Req params', reqParams);
                log.stat('received_request', 'success', log.method, log.nodeName, log.cmd);
                log.detail.addInputRequest(log.nodeName, log.cmd, log.invoke, '', reqParams);
                //= ================= [ END Create Session ] ====================//

                //= ================= [ START Check Url Not Found ] ==================//
                const urlNotFound = await checkUrlNotFound(req);
                //= ================= [ START Check Url Not Found ] ==================//

                if (urlNotFound === false) {
                    //= ================= [ START Auten ] ==================//
                    const authen = await checkAuthentication(req);
                    //= ================= [ END Auten ] ====================//

                    if (authen === true) {
                        next();
                    } else {
                        const resultData = new ResultDataProperty();
                        await resultData.unauthorized({});
                        const response = new ResponseProperty();
                        response.submit(res, resultData);
                    }
                } else {
                    const resultData = new ResultDataProperty();
                    await resultData.dataNotFound({});
                    const response = new ResponseProperty();
                    response.submit(res, resultData);
                }
            }
        });
    }
}

export default MiddlewareController;
