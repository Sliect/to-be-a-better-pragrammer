const path = require('path');
const utils = require('@umijs/utils');

const { fsExtra } = utils;

fsExtra.writeFileSync(
  path.join(__dirname, `../.cache.json`),
  JSON.stringify({}, null, 2),
);
