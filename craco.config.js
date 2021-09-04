// eslint-disable-next-line node/no-unpublished-require
const CracoLessPlugin = require('craco-less');

module.exports = {
  reactScriptsVersion: 'react-scripts' /* (default value) */,
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              '@primary-color': '#D9AF53',
            },
            javascriptEnabled: true,
          },
        },
        cssLoaderOptions: {
          modules: {
            localIdentName: '[path][name]__[local]--[hash:base64:5]',
          },
        },
      },
    },
  ],
  devServer: {
    port: 3000,
    proxy: {
      '/rivernft': {
        target: 'https://api-dev.rivermen.io',
        changeOrigin: true,
      },
    },
  },
};
