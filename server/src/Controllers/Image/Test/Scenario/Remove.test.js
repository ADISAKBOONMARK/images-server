import { API, EXPECT } from '../../../../MainProperty.test';

const service = 'remove';

const runTest = async function (controller) {
    describe(service, async () => {
        it('success basic flow', async function () {
            const api = new API();

            const requestOption = {
                cmd: '/' + controller + '/' + 'import',
                body: {
                    group: 'test',
                    base64:
                        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAAdgAAAHYBTnsmCAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAKCSURBVDiNbZK7T1NRHMc/59wL5dIWbQsSKVRCqCZURFMFH4kRBGMREjf/ADXsDA6uxtFInBjcNNHI4mJcxBBjNBifgRpDHFQUbQB5tA3c2/b+HKCV1286j+/j/L6/o9hSp+O9rbj6imjOIjQCoPgmwjNTy92xt08mN+JVcZFoTngyfvM2SgZ2Vzi6s8kmUGngFIRPM5qJlAVQEBhesK3BZHLEKQkkmhOedJX5VCGdIcuhr8XBKjNKLgJ8nS0wPl1BxjEBnv+1rUQyOeJogMwuY0ghnQAdDdlN5KJLdI/JuWiGcsMF6Ap6Vm4BqNPx3lYR/RHQHqPAxViaQKWnRNaGprWjnZyT4/3rcZ5+MUll19pxC6rNxNVXUGgAF4UoRexYnEqfH7OsjJpwHZU+L5nlNO9ejSNSis3QhnvZFCXdpSyVSV1TlNbjHVuHg8/vo6qmmuUJZz0VEFSPBhUpgmpDFhfOtW8jr4kr+vq78fv+t6dgny7JAX/mVlhctncWAOYWsswvrW48Eg0yXdzlCy7X7rzZkSwi3Lg3xaGjB9kV8K+3wA8jsvfAfgXHi8DFtE0suodwbdUmgQ8zBifO99JzoYu2ozF+/0oxm5q7bzSFoz9F1ACsTQKgXLucPNKA0pp8eYBVbyNpYzfhSATTLCNUHcLr88jL0XdX9djbJ5MCwxvdvqeyiJ3FzTlkgoexvfXU1Uc2vShUE1x48f7xlAZYsK1BYBSgyuvh6qU42vJh+xsRtf4rVWn+iAiRxkhwfin9wACYnf1c8AfbHlpmPiAQz+ddbZZ78LecQWvN1lJKYRgm+VyuQW29PNXWH9OGe1lQPTeHrreEI3u12oYChJzryqN/oV3a00fmsUEAAAAASUVORK5CYII=',
                },
            };

            const importResponse = await api.post(requestOption);

            EXPECT(importResponse.status).to.equal(202);

            requestOption.cmd = '/' + controller + '/' + service;
            requestOption.body.id = importResponse.data.data.id;

            const response = await api.post(requestOption);

            EXPECT(response.status).to.equal(202);
        });

        it('image not found', async function () {
            const api = new API();

            const requestOption = {
                cmd: '/' + controller + '/' + service,
                body: {
                    group: 'test',
                    id: '123456789',
                },
            };

            const response = await api.post(requestOption);

            EXPECT(response.status).to.equal(500);
        });

        it('validate fail', async function () {
            const api = new API();

            const requestOption = {
                cmd: '/' + controller + '/' + service,
                body: {},
            };

            const response = await api.post(requestOption);

            EXPECT(response.status).to.equal(400);
        });
    });
};

export default { runTest };
