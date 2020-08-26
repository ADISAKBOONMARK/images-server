import { API_PATH } from './MainProperty';

import axios from 'axios';

import { expect } from 'chai';
import { strict } from 'assert';

const EXPECT = expect;
const STRICT = strict;

const HEADERS = {
    'Content-Type': 'application/json',
};

const API = class {
    async get(requestOption) {
        const params = new URLSearchParams(requestOption.params).toString();

        const option = {
            method: 'GET',
            headers: requestOption.headers || HEADERS,
            url: API_PATH + requestOption.cmd + '?' + params,
        };

        const response = await axios(option)
            .then(function (response) {
                return response;
            })
            .catch(function (err) {
                return err.response;
            });

        return response;
    }

    async post(requestOption) {
        const option = {
            method: 'POST',
            headers: requestOption.headers || HEADERS,
            url: API_PATH + requestOption.cmd,
            data: requestOption.body,
        };

        const response = await axios(option)
            .then(function (response) {
                return response;
            })
            .catch(function (err) {
                return err.response;
            });

        return response;
    }
};

export { API, EXPECT, STRICT };
