import { APP, ENDPOINT, ROOT_URL } from '../../MainProperty';

import ResultDataProperty from '../../BusinessData/Result/ResultData/ResultDataProperty';
import ResponseProperty from '../../BusinessData/Response/ResponseProperty';

import Model from '../../Models/Images/ImagesModel';

class ImagesController {
    async setController() {
        APP.get('/image.file/:group/:id', async function (req, res) {
            try {
                const params = req.params;
                res.redirect(ENDPOINT + '/image' + '/' + params.group + '/' + params.id + '.jpg');
            } catch (err) {
                res.sendStatus(500).end();
            }
        });

        APP.post(ROOT_URL + '/image/import', async function (req, res) {
            try {
                const log = res.log;
                const params = req.body;
                const model = new Model();
                const resultData = await model.import(log, params);
                const response = new ResponseProperty();
                response.submit(res, resultData);
            } catch (err) {
                const resultData = new ResultDataProperty();
                await resultData.systemError({ developerMoreInfo: err.message });
                const response = new ResponseProperty();
                response.submit(res, resultData, err);
            }
        });
    }
}

export default ImagesController;
