import { APP, ENDPOINT } from '../../MainProperty';

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
    }
}

export default ImagesController;
