class ResponseProperty {
    async submit(res, result, err) {
        const log = res.log;

        const jsonString = JSON.stringify(result);

        if (result.status === true) {
            log.stat('response', 'success', log.method, log.nodeName, log.cmd);
            log.debug('Res data ' + jsonString);
        } else {
            log.stat('response', 'error', log.method, log.nodeName, log.cmd);
            if (err !== undefined) {
                log.error(err);
            }
            log.error('Res data ' + jsonString);
        }

        log.summary.end(result.code, result.developerMessage);

        log.detail.addOutputResponse(log.nodeName, log.cmd, log.invoke, '', result);
        log.detail.end();

        res.log.info('End Proccess');

        res.status(await result.getResponseCode()).end(jsonString);
    }
}

export default ResponseProperty;
