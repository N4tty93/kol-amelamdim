const path = require('path');

/**
 * @type {import('next-i18next').UserConfig}
 **/

const i18nConfig = {
  i18n: {
    defaultLocale: 'he',
    locales: ['he', 'en'],
    localePath: path.resolve('./apps/kol-amelamdim/public/locales'),
    localeDetection: false,
  },
};
module.exports = i18nConfig;
