// eslint-disable-next-line @typescript-eslint/no-var-requires
const withNx = require('@nrwl/next/plugins/with-nx');
const { i18n } = require('./next-i18next.config');

/**
 * @type {import('@nrwl/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  nx: {
    // Set this to true if you would like to to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false,
  },
  i18n,
  env: {
    MONGO_URI:
      'mongodb+srv://david:771992@cluster0.0tyx9p1.mongodb.net/?retryWrites=true&w=majority',
  },
};

module.exports = withNx(nextConfig);
