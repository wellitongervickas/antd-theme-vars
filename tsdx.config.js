const replace = require('@rollup/plugin-replace');

module.exports = {
  rollup(config) {
    config.plugins = [
      ...config.plugins,
      replace({
        preventAssignment: true
      }),
    ];
    
    return config;
  },
};