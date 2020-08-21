import { v4 as uuidv4 } from 'uuid';

import RandomsProvider from '../Randoms/RandomsProvider';

class UniqueIdProvider {
    async generateByNumberAndString(len) {
        const randoms = new RandomsProvider();

        let code = '';

        for (let i = 0; i < len; i++) {
            const randomCase = await randoms.numberToString(1, 2);

            switch (randomCase) {
                case '1':
                    code += await randoms.numberToString(0, 9);
                    break;
                default:
                    code += await randoms.characterLowercase();
                    break;
            }
        }

        return code;
    }

    async generate() {
        // OPTION:You can replace symbol (-) [e.g. uuidv4().replace(/-/g, '');]
        return await uuidv4();
    }
}

export default UniqueIdProvider;
