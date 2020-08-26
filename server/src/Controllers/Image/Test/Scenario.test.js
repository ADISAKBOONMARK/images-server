import Import from './Scenario/Import.test';
import Remove from './Scenario/Remove.test';

const controller = 'image';

const runTest = async function () {
    describe(controller, async () => {
        Import.runTest(controller);
        Remove.runTest(controller);
    });
};

export default { runTest };
