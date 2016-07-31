require('./vangog.less');
const all = require('./index');

module.exports = all.Vangog;
for (const key of Object.keys(all)) {
  module.exports[key] = all[key];
}
