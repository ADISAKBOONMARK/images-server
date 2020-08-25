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

        resultData.accepted({ data: { url: ENDPOINT + '/image.file' + imgExportPath } });

        return resultData;
    }
}

export default ImageService;
