# umi

umi插件

``` ts
import { IApi } from 'umi';
 
export default (api: IApi) => {
  api.describe({
    key: 'changeFavicon',
    config: {
      schema(joi) {
        return joi.string();
      },
    },
    enableBy: api.EnableBy.config
  });
  api.modifyConfig((memo)=>{
    memo.favicon = api.userConfig.changeFavicon;
    return memo;
  });
};
```

presets：插件集，环境预设
plugins: 插件

项目解析

- szzj-umi-preset-app
  - @szzj/umi-plugin-region
  - @umijs/plugin-sass
  - @umijs/plugin-antd
  - @szzj/umi-plugin-app
  - @szzj/umi-plugin-request
  - @szzj/umi-plugin-hooks
  - @umijs/plugin-initial-state
  - @szzj/umi-plugin-layout
  - @umijs/plugin-model
  - @umijs/plugin-test
  - @szzj/umi-plugin-lint
  - @umijs/plugin-esbuild

