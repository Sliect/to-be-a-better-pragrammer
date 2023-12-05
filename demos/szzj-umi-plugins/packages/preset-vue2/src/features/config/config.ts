import Config from '@umijs/bundler-webpack/compiled/webpack-5-chain';
import { IApi } from 'umi';
import { addAssetRules } from './assetRules';

export function getConfig(config: Config, api: IApi) {
  config.module.noParse(/^(vue|vue-router|vuex|vuex-router-sync)$/);

  // https://github.com/webpack/webpack/issues/11467#issuecomment-691873586
  config.module
    .rule('esm')
    .test(/\.m?jsx?$/)
    .resolve.set('fullySpecified', false);

  config.resolve.extensions.merge(['.vue']).end();

  /**
   * 针对 vue2 项目，参照 @vue/cli-server@4，切换使用 vue-loader@15
   */
  config.module
    .rule('vue')
    .test(/\.vue$/)
    .use('vue-loader')
    .loader(require.resolve('vue-loader'));

  config.plugin('vue-loader-plugin').use(require('vue-loader').VueLoaderPlugin);

  // asset
  addAssetRules({ api, config });
}
