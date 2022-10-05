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
  env: {
    S3_ACCESS_KEY: 'AKIAZSW6X7C4T4DX2MUW',
    S3_SECRET_KEY: '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',
    AWS_BUCKET_NAME: 'kol-amelamdim-bucket',
    MONGO_URI:
      'mongodb+srv://david:771992@cluster0.0tyx9p1.mongodb.net/?retryWrites=true&w=majority',
    ACCESS_TOKEN_SECRET:
      '129d4cd978d5fedb613bba2140205d9bb6870c45e41a0b562cda47ce31981f50cc89eafba452b0b56ef6ca9f4afb3036ff575a662dc01418e950674334781568',
    ADMIN_TOKEN_SECRET: 'kolamelamdim2022!',
  },
  i18n,
};

module.exports = withNx(nextConfig);
