import { VALIDATION } from '../../MainProperty';

import ResultDataProperty from '../../BusinessData/Result/ResultData/ResultDataProperty';

import Service from '../../Services/Images/ImagesService';

class ImagesModel {
    async import(log, params) {
        const rules = {
            group: 'required|string',
            base64: 'required|string',
        };

        const resultValidate = await VALIDATION.compare(params, rules);

        const resultData = new ResultDataProperty();

        if (resultValidate.status === true) {
            const service = new Service();
            const result = await service.getDetail(log, params);
            resultData.set(result);
        } else {
            resultData.badRequest({ developerMoreInfo: resultValidate.message });
        }

        return resultData;
    }
}

export default ImagesModel;
