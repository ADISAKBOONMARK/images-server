import path from 'path';
import fs from 'fs';

import { expect } from 'chai';
import { strict } from 'assert';

const ROOT_PATH = __dirname;
const PATH = path;
const FS = fs;

const EXPECT = expect;
const STRICT = strict;

const LOG = new (class LogProvider {
    async info(...msg) {}
    async debug(...msg) {}
    async error(...msg) {}
    async warn(...msg) {}
})();

const IMAGES_PATH = PATH.join(ROOT_PATH + '/../images');

export { IMAGES_PATH, ROOT_PATH, PATH, FS, LOG, EXPECT, STRICT };
