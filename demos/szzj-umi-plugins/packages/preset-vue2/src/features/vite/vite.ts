import vueJsx from '@vitejs/plugin-vue2-jsx';
import type { IApi } from 'umi';
// @ts-ignore
import vue from '@vitejs/plugin-vue2';

export default (api: IApi) => {
  api.describe({
    key: 'preset-vue2:vite',
  });

  api.modifyViteConfig((config) => {
    config.plugins?.push(vue(api.config.vue));
    config.plugins?.push(vueJsx(api.config?.vue?.pluginJsx));
    return config;
  });
};
