import { PATH, FS, UNIQUE_ID, ENDPOINT, IMAGES_PATH } from '../../MainProperty';

import ResultDataProperty from '../../BusinessData/Result/ResultData/ResultDataProperty';

class ImageService {
    async import(log, params) {
        const imgGroup = params.group;
        const imgBase64 = params.base64;
        const imgId = await UNIQUE_ID.generate();

        const imgExportPath = '/' + imgGroup + '/' + imgId;

        const imgDirPath = PATH.join(IMAGES_PATH + '/' + imgGroup);
        const imgFilePath = imgDirPath + '/' + imgId + '.jpg';

        if (imgBase64.indexOf(';base64,') !== -1) {
            const base64Image = imgBase64.split(';base64,').pop();

            const writeFile = async () => {
                await FS.writeFileSync(imgFilePath, base64Image, 'base64');
            };

            if (FS.existsSync(imgDirPath)) {
                await writeFile();
            } else {
                await FS.mkdirSync(imgDirPath);
                await writeFile();
            }
            const resultData = new ResultDataProperty();

            await resultData.accepted({
                data: { id: imgId, group: imgGroup, url: ENDPOINT + '/image.file' + imgExportPath },
            });

            return resultData;
        } else {
            const message = 'The image require base64 format.';

            const resultData = new ResultDataProperty();

            await resultData.badRequest({ userMoreInfo: message, developerMoreInfo: message });

            return resultData;
        }
    }

    async remove(log, params) {
        const imgGroup = params.group;
        const imgId = params.id;

        const imgDirPath = PATH.join(IMAGES_PATH + '/' + imgGroup);
        const imgFilePath = imgDirPath + '/' + imgId + '.jpg';

        if (FS.existsSync(imgFilePath)) {
            await FS.unlinkSync(imgFilePath);

            const message = 'remove image success';

            const resultData = new ResultDataProperty();

            await resultData.accepted({ userMoreInfo: message, developerMoreInfo: message });

            return resultData;
        } else {
            const message = 'image not found';

            const resultData = new ResultDataProperty();

            await resultData.systemError({ userMoreInfo: message, developerMoreInfo: message });

            return resultData;
        }
    }
}

export default ImageService;
