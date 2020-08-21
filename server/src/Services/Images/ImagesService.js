import { PATH, FS, ROOT_PATH, UNIQUE_ID, ENDPOINT } from '../../MainProperty';

import ResultDataProperty from '../../BusinessData/Result/ResultData/ResultDataProperty';

class ImagesService {
    async import(log, params) {
        const imgPath = '/' + params.group + '/' + (await UNIQUE_ID.generate());

        const imgFilePath = PATH.join(ROOT_PATH, '../images' + imgPath + '.jpg');

        const base64Image = params.base64.split(';base64,').pop();

        const writeFileResult = await FS.writeFile(imgFilePath, base64Image, 'base64');
        console.log(writeFileResult);
        const resultData = new ResultDataProperty();

        resultData.data = {
            url: ENDPOINT + imgPath,
        };

        return resultData;
    }
}

export default ImagesService;
